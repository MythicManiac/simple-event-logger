import { action, computed, observable } from "mobx";
import { EventData } from "@common/event";

class _EventStore {
  @observable
  private _events: EventData[] = [];

  @observable
  private _pinnedEvents = new Map<string, EventData>();

  @observable
  private _selectedEvent: EventData | undefined;

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
    // if (this.selectedEvent) return this.selectedEvent.id;
    return undefined;
  }

  isPinned(event: EventData): boolean {
    return this._pinnedEvents.has(event.id);
  }

  @action
  selectEvent(event: EventData) {
    this._selectedEvent = event;
  }

  @action
  addEvent(event: EventData) {
    this._events.push(event);
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
