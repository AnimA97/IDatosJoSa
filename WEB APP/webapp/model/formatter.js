sap.ui.define([
	"sap/ui/model/type/Currency"
], function (Currency) {
	"use strict";

	return {

		formatDate: function (dateString) {
			const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' };
			const date = new Date(dateString);
			return date.toLocaleDateString('en-GB', options).replace(',', '');
		},

		setChartData: function (aChartData) {
			let oDataset = {
				label: "My First dataset",
				fill: false,
				lineTension: 0.1,
				backgroundColor: "rgba(75,192,192,0.4)",
				borderColor: "rgba(75,192,192,1)",
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: "rgba(75,192,192,1)",
				pointBackgroundColor: "#fff",
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: "rgba(75,192,192,1)",
				pointHoverBorderColor: "rgba(220,220,220,1)",
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: aChartData.map(row => row.rank),
				spanGaps: false
			}
			return oDataset;
		},

		setChartLabels: function (aChartData) {
			return aChartData.map(row => row.date);
		},

		rankToState: function (nRank){
			if (!nRank) return sap.ui.core.MessageType.None
			else if (nRank >= 80) return sap.ui.core.MessageType.Error
			else if (nRank >= 50) return sap.ui.core.MessageType.Warning
			else if (nRank >= 25) return sap.ui.core.MessageType.Information
			else if (nRank > 0) return sap.ui.core.MessageType.Success
			return sap.ui.core.MessageType.None
		},
	};
});