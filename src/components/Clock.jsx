import React  from 'react';
import styles from './Clock.css';
 
class ClockWidget extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			time: new Date()
    }
    this.update = this.update.bind(this)
	}
	
	componentDidMount() {
		setInterval(this.update, 1000)
	}
	
	update () {
		this.setState({
			time: new Date()
		})
	};
	
	render() {
		
		const h = this.state.time.getHours()
		const m = this.state.time.getMinutes()
		const s = this.state.time.getSeconds()
		
		return (
      <div id="clock" className={styles.clock}>
			<h1 className={styles.h1}>{h % 12}:{(m < 10 ? '0' + m : m)}:{(s < 10 ? '0' + s : s)} {h < 12 ? 'am' : 'pm'}</h1>
      </div>
		)
	}
};

export default ClockWidget;