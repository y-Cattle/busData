Component({
    properties: {
        value: {
            type: Array,
            value: [],
            observer: "onValue"
        },
        isShow: {
            type: Boolean,
            value: false,
            observer: "onShow"
        }
    },

    data: {
        years: [],
        months: [],
        tempYearPos: [0],
        tempMonthPos: [0],
        showPicker: false
    },

    attached: function() {
        /**
         * 初始化年月日
         */
        var date = new Date();
        var years = [];
        var months = [];

        for (let i = 1900; i <= date.getFullYear(); i++) {
            years.push(i);
        }

        for (let i = 1; i <= 12; i++) {
            let month = 0;
            month = i < 10 ? i : i;
            months.push(month);
        }

        this.setData({
            years: years,
            months: months,
        });

    },

    methods: {
        onTouchmask: function(event) {
        },
        onCacnelClick(e) {
            this.triggerEvent('cancelclick', {});
        },
        onSureClick(e) {
            var curYear = this.data.years[this.data.tempYearPos];
            var curMonth = this.data.months[this.data.tempMonthPos];

            var value = [curYear, curMonth];
            this.triggerEvent('sureclick', {
                value: value,
            });
        },
        year_onChange: function(e) {
            var curYear = this.data.years[e.detail.value];
            this.setData({
                tempYearPos: e.detail.value,
                tempMonthPos: [0]
            });
        },
        month_onChange: function(e) {
            var curYear = this.data.years[this.data.tempYearPos];
            var curMonth = this.data.months[e.detail.value];
            this.setData({
                tempMonthPos: e.detail.value
            });
        },
      
        onValue() {
            //通过传进来的年月日,计算对应的index
            var data = this.getRefreshData();
            this.setData(data)
        },
        onShow() {
            var data = this.getRefreshData();
            data.showPicker = this.data.isShow;
            this.setData(data)
        },
        
        getRefreshData() {
            //通过传进来的年月日,计算对应的index
            if (this.data.years == null || this.data.years.length == 0) {
                return {};
            }

            var date = new Date();

            var tempYearPos = this.data.years.length - 1;
            var tempMonthPos = date.getMonth();

            for (var i = 0; i < this.data.years.length; i++) {
                var item = this.data.years[i];
                if (item == this.data.value[0]) {
                    tempYearPos = i;
                    break;
                }
            }

            for (var i = 0; i < this.data.months.length; i++) {
                var item = this.data.months[i];
                if (item == this.data.value[1]) {
                    tempMonthPos = i;
                    break;
                }
            }
            
            var data = {
                tempYearPos: [tempYearPos],
                tempMonthPos: [tempMonthPos],
            }
            return data;
        },
    }
});