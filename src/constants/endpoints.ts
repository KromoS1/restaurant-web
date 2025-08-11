export class TABLES_ENDPOINTS {
	static readonly TABLES = "/table";
	static readonly TABLES_ID = (id: string) => `${this.TABLES}/${id}`;
	static readonly TABLES_MAINTENANCE = (id: string) => `${this.TABLES}/${id}/maintenance`;
	static readonly TABLES_AVAILABLE = `${this.TABLES}/available-with-info`;
}

export class RESERVATIONS_ENDPOINTS {
	static readonly RESERVATIONS = "/reservation";
	static readonly RESERVATIONS_ID = (id: string) => `/${this.RESERVATIONS}/${id}`;
	static readonly RESERVATIONS_CONFIRM = (id: string) => `/${this.RESERVATIONS}/status/${id}/confirm`;
	static readonly RESERVATIONS_SEAT = (id: string) => `/${this.RESERVATIONS}/status/${id}/seat`;
	static readonly RESERVATIONS_COMPLETE = (id: string) => `/${this.RESERVATIONS}/status/${id}/complete`;
	static readonly RESERVATIONS_CANCEL = (id: string) => `/${this.RESERVATIONS}/status/${id}/cancel`;
	static readonly RESERVATIONS_NO_SHOW = (id: string) => `/${this.RESERVATIONS}/status/${id}/no-show`;
}

export class GUESTS_ENDPOINTS {
	static readonly GUESTS = "/guest";
}

export class WALK_IN_ENDPOINTS {
	static readonly WALK_IN = "/walk-in";
	static readonly WALK_IN_ID = (id: string) => `/${this.WALK_IN}/${id}`;
	static readonly WALK_IN_SEAT = (id: string) => `/${this.WALK_IN}/${id}/seat`;
	static readonly WALK_IN_COMPLETE = (id: string) => `/${this.WALK_IN}/${id}/complete`;
	static readonly WALK_IN_WAITING_QUEUE = `${this.WALK_IN}/waiting-queue`;
	static readonly WALK_IN_WAITING_QUEUE_LIST = `${this.WALK_IN}/waiting-queue/list`;
	static readonly WALK_IN_QUICK_SEAT = `${this.WALK_IN}/quick-seat`;
}

export class ANALYTICS_ENDPOINTS {
	static readonly ANALYTICS = "/analytics";
	static readonly ANALYTICS_DAILY_OCCUPANCY = `${this.ANALYTICS}/daily-occupancy`;
	static readonly ANALYTICS_PEAK_HOURS = `${this.ANALYTICS}/peak-hours`;
	static readonly ANALYTICS_AVERAGE_DINING_TIME = `${this.ANALYTICS}/average-dining-time`;
	static readonly ANALYTICS_DAILY_SUMMARY = `${this.ANALYTICS}/daily-summary`;
	static readonly ANALYTICS_SAVED = `${this.ANALYTICS}/saved`;
	static readonly ANALYTICS_CURRENT_WEEK = `${this.ANALYTICS}/current-week`;
}