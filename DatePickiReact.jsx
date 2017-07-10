import React from 'react';

class DatePickiReact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cal_days_labels : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
			cal_months_labels : ['January', 'February', 'March', 'April',
		  'May', 'June', 'July', 'August', 'September',
		  'October', 'November', 'December'
		],
			cal_days_in_month : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
			cal_current_date : new Date(),
			calendarInputValue : '',
			showMonths : false,
			showYears : false
		};

		this.showDatepicker = this.showDatepicker.bind(this);



		this.state.month = (isNaN(this.props.month) || this.props.month == null) ? this.state.cal_current_date.getMonth() : parseInt(this.props.month-1);
		this.state.year = (isNaN(this.props.year) || this.props.year == null) ? this.state.cal_current_date.getFullYear() : this.props.year;
		this.state.format = (this.props.format == null) ? 'MM/DD/YYYY' : this.props.format ;

		this.generateHTML = this.generateHTML.bind(this);
		this.monthDec = this.monthDec.bind(this);
		this.monthInc = this.monthInc.bind(this);
		this.getCalendarDate = this.getCalendarDate.bind(this);
		this.onFocusInput = this.onFocusInput.bind(this);
		this.onHideCalendar = this.onHideCalendar.bind(this);
		this.onClearCalendar = this.onClearCalendar.bind(this);
		this.inputHandleChange = this.inputHandleChange.bind(this);
		this.monthSelect = this.monthSelect.bind(this);
		this.yearSelect = this.yearSelect.bind(this);
	}

	monthSelect() {
		this.setState({ showMonths: true, showYears: false});
	}

	yearSelect() {
		this.setState({ showMonths: false, showYears: true});
	}

	getCalendarDate(date) {
		console.log(JSON.stringify(date));
		var dateFor = '';
		if( this.state.format === 'DD/MM/YYYY' ) {
			dateFor = ("0" + date).slice(-2)+'/'+("0" + (this.state.month+1)).slice(-2) +'/'+this.state.year;
		}
		else if( this.state.format === 'DD-MM-YYYY' ) {
			dateFor = ("0" + date).slice(-2)+'-'+("0" + (this.state.month+1)).slice(-2)+'-'+this.state.year;
		}
		else if( this.state.format === 'MM-DD-YYYY' ) {
			dateFor = ("0" + (this.state.month+1)).slice(-2)+'-'+("0" + date).slice(-2)+'-'+this.state.year;
		}
		else {
			dateFor = ("0" + (this.state.month+1)).slice(-2)+'/'+("0" + date).slice(-2)+'/'+this.state.year;
		}
		//document.getElementById("calendar-input").value = dateFor;
		this.setState({showCalendar:false, calendarInputValue: dateFor});
	}

	inputHandleChange(event) {
	    this.setState({calendarInputValue: event.target.value});
	  }

	onFocusInput() {
		this.setState({showCalendar: true});
	}

	onHideCalendar() {
		this.setState({showCalendar: false});
	}

	onClearCalendar() {
		this.setState({ calendarInputValue: '', showCalendar: false});
	}

	monthDec() {
		if(this.state.month == 0) {
			this.setState({month: 11});
			this.setState({year: --this.state.year});
		} 
		else {
			this.setState({month: --this.state.month});
		}
	}

	monthInc() {
		if(this.state.month == 11) {
			this.setState({month: 0});
			this.setState({year: ++this.state.year});
		} 
		else {
			this.setState({month: ++this.state.month});
		}
	}

	generateHTML() {
		  // get first day of month
		  var firstDay = new Date(this.state.year, this.state.month, 1);
		  var startingDay = firstDay.getDay();

		  // find number of days in month
		  var monthLength = this.state.cal_days_in_month[this.state.month];

		  // compensate for leap year
		  if (this.state.month == 1) { // February only!
		    if ((this.state.year % 4 == 0 && this.state.year % 100 != 0) || this.state.year % 400 == 0) {
		      monthLength = 29;
		    }
		  }

		  // do the header
		  var monthName = this.state.cal_months_labels[this.state.month]
		  var html = '<div>';
		  html += '<div class="month"><ul><li class="prev" onClick={this.monthDec}>&#10094;</li><li class="next">&#10095;</li><li style="text-align:center">';
		  html += monthName + '<br><span style="font-size:18px">' + this.state.year;
		  html += ' </li></ul></div>';
		  html += '<ul class="weekdays">';
		  for (var i = 0; i <= 6; i++) {
		    html += '<li>';
		    html += this.state.cal_days_labels[i];
		    html += '</li>';
		  }
		  html += '</ul></div><ul class="days">';

		  // fill in the days
		  var day = 1;
		  // this.state loop is for is weeks (rows)
		  for (var i = 0; i < 9; i++) {
		    // this.state loop is for weekdays (cells)
		    for (var j = 0; j <= 6; j++) {
		      html += '<li class="bg-day">';
		      if (day <= monthLength && (i > 0 || j >= startingDay)) {
		        html += day;
		        day++;
		      }
		      html += '</li>';
		    }
		    // stop making rows if we've run out of days
		    if (day > monthLength) {
		      break;
		    } else {
		      //html += '</ul>';
		    }
		  }
		  html += '</ul></div>';

		  this.state.html = html;
	}

	showDatepicker(e) {
		console.log(this.state);
	}

	render() {
		if(this.state.showCalendar) {
			// get first day of month
		    var firstDay = new Date(this.state.year, this.state.month, 1);
		    var startingDay = firstDay.getDay();

		  	// find number of days in month
		  	var monthLength = this.state.cal_days_in_month[this.state.month];

			  // compensate for leap year
			  if (this.state.month == 1) { // February only!
			    if ((this.state.year % 4 == 0 && this.state.year % 100 != 0) || this.state.year % 400 == 0) {
			      monthLength = 29;
			    }
			  }

		   // do the header
		   var monthName = this.state.cal_months_labels[this.state.month];
		   var filldays = [];
		  	// fill in the days
		  	var day = 0;
		  	for(var i=0; i<42; i++) {
		  		if(i >= startingDay &&  day < monthLength) {
		  			let d = ++day;
		  			filldays.push(<li key={i} onClick={(() => this.getCalendarDate(d))} className={this.state.cal_current_date.getDate() == d && this.state.month == this.state.cal_current_date.getMonth() ? 'today-date':'' +'date'}>{ (d)}</li>)
		  		}
		  		else {
		  			filldays.push(<li key={i}></li>)
		  		}
		  	}
			return (<div className="calendar-comp"><input id="calendar-input" type="text" onClick={ this.onFocusInput } value={this.state.calendarInputValue} onChange={this.inputHandleChange} /><div className="calendar-wrap"><div className="month"><ul>
				<li className="prev" onClick={this.monthDec}>&#10094;</li>
				<li className="next" onClick={this.monthInc}>&#10095;</li>
				<li className="calendarMonth">
				<span onClick={this.monthSelect}>{monthName}</span><br/> <span onClick={this.yearSelect}>{this.state.year}</span></li></ul></div>
				<ul className="weekdays">
			  	 {this.state.cal_days_labels.map((item, index) => (
			       <li key={index}>{item}</li>
			    ))}
			  	</ul>
			  	<ul className="days">
			  		{filldays}
			  		<li className="cancel-calendar"><a href="javascript:void(0)" onClick={this.onHideCalendar}>cancel</a></li>
			  		<li className="cancel-calendar"><a href="javascript:void(0)" onClick={this.onClearCalendar}>clear</a></li>
			  	</ul></div>
			  	</div>);
		}
		else {
			return (<div className="calendar-comp"><input id="calendar-input" type="text" onClick={ this.onFocusInput }  value={this.state.calendarInputValue} onChange={this.inputHandleChange} /></div>);
		}
		
	}
}

export default DatePickiReact;