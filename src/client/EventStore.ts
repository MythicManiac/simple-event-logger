import { action, computed, observable } from "mobx";
import { EventData } from "@common/event";
import { API_HOST } from "@client/consts";
import { deserializeEventData } from "@client/serialization";

class _EventStore {
  @observable
  private _events: EventData[] = [];

  @observable
  private _pinnedEvents = new Map<string, EventData>();

  @observable
  private _selectedEvent: EventData | undefined;

  @observable
  private _maximumEvents = 30;

  @observable
  private _isLogging = true;

  @computed
  public get events(): EventData[] {
    return this._events.filter(x => !this._pinnedEvents.has(x.id));
  }

  @computed
  public get pinnedEvents(): EventData[] {
    return Array.from(this._pinnedEvents.values()).sort(
      (a, b) => +b.timestamp - +a.timestamp
    );
  }

  @computed
  public get selectedEvent(): EventData | undefined {
    return this._selectedEvent;
  }

  @computed
  public get selectedEventId(): string | undefined {
    if (this.selectedEvent) return this.selectedEvent.id;
    return undefined;
  }

  @computed
  public get isLogging(): boolean {
    return this._isLogging;
  }

  isPinned(event: EventData): boolean {
    return this._pinnedEvents.has(event.id);
  }

  @action
  selectEvent(event: EventData) {
    this._selectedEvent = event;
  }

  @action
  setIsLogging(isLogging: boolean) {
    this._isLogging = isLogging;
  }

  @action
  clearUnpinned() {
    this._events = [];
  }

  @action
  addEvent(event: EventData) {
    if (!this._isLogging) return;
    this._events.push(event);
    if (this._events.length > this._maximumEvents) {
      this._events = this._events.slice(
        Math.max(this._events.length - this._maximumEvents, 0)
      );
    }
  }

  @action
  setEvents(events: EventData[]) {
    this._events = events;
    if (this._events.length > this._maximumEvents) {
      this._events = this._events.slice(
        Math.max(this._events.length - this._maximumEvents, 0)
      );
    }
  }

  refreshEvents() {
    return fetch(`${API_HOST}/api/event/`)
      .then(response => response.json())
      .then(entries => entries.map(deserializeEventData))
      .then(data => this.setEvents(data));
  }

  @action
  toggleEventPin(event: EventData) {
    if (this._pinnedEvents.has(event.id)) {
      this._pinnedEvents.delete(event.id);
    } else {
      this._pinnedEvents.set(event.id, event);
    }
  }
}
export const EventStore = new _EventStore();
