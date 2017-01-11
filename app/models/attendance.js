
module.exports = function Attendance(id, name, presence, changedAt, placeType, source) {
	this.id = id;
	this.name = name;
	this.presence = presence;
	this.changedAt = changedAt;
	this.placeType = placeType;
	this.source = source;
};