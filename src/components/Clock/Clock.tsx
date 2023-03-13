import { Component } from 'react';

type State = {
  today: Date,
};

type Props = {
  clockName: string,
};

function getCorrectTime(date: Date): string {
  return date.toUTCString().slice(-12, -4);
}

export class Clock extends Component<Props, State> {
  state: State = {
    today: new Date(),
  };

  clicker = 0;

  componentDidMount() {
    this.clicker = window.setInterval(() => {
      this.setState({ today: new Date() });
      window.console.info(
        getCorrectTime(this.state.today),
      );
    }, 1000);
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    if (this.props.clockName !== prevProps.clockName) {
      window.console.debug(
        `Renamed from ${prevProps.clockName} to ${this.props.clockName}`,
      );
    }
  }

  componentWillUnmount() {
    window.clearInterval(this.clicker);
  }

  render() {
    const { today } = this.state;
    const { clockName } = this.props;

    return (
      <div className="Clock">
        <strong className="Clock__name">
          {clockName}
        </strong>

        {' time is '}

        <span className="Clock__time">
          { getCorrectTime(today) }
        </span>
      </div>
    );
  }
}
