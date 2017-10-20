import React from 'react';
import { StarBorder, Star } from 'material-ui-icons';
import colors from 'material-ui/colors';
import { orange, grey } from 'material-ui/colors';

const styles = {
  editable: {
    cursor: 'pointer',
  },
};

const defaultValues = [1, 2, 3, 4, 5];

const Ch = props => {
  let { checked, hovered, readOnly = false, ...p } = props;
  const st = readOnly ? {} : styles.editable;
  if (checked) return <Star style={st} color={orange['500']} {...p} />;
  else if (hovered)
    return <StarBorder style={st} color={orange['500']} {...p} />;
  else return <StarBorder style={st} color={grey['500']} {...p} />;
};

class Rating extends React.Component {
  static defaultProps = {
    onChange: () => console.log('hi'),
    value: 0,
    readOnly: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      hoveredIndex: 0,
      checkedIndex: props.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ checkedIndex: nextProps.value });
  }

  onCheck(i, e) {
    this.setState({ checkedIndex: i });
    if (this.props.onChange) this.props.onChange(i);
  }

  onMouseEnter(i, e) {
    this.setState({ hoveredIndex: i });
  }

  onMouseLeave(i, e) {
    this.setState({ hoveredIndex: 0 });
  }

  render() {
    const { hoveredIndex, checkedIndex } = this.state;
    const { readOnly, values = defaultValues } = this.props;
    return (
      <div style={{}}>
        {values.map(i => {
          let onClick = readOnly ? undefined : this.onCheck.bind(this, i),
            onMouseEnter = readOnly
              ? undefined
              : this.onMouseEnter.bind(this, i),
            onMouseLeave = readOnly
              ? undefined
              : this.onMouseLeave.bind(this, i),
            checked = i <= checkedIndex,
            hovered = i <= hoveredIndex;

          if (
            hoveredIndex > 0 &&
            checkedIndex > 0 &&
            i > hoveredIndex &&
            i <= checkedIndex
          ) {
            checked = false;
            hovered = true;
          }

          return (
            <Ch
              checked={checked}
              key={i}
              hovered={hovered}
              readOnly={readOnly}
              onClick={onClick}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            />
          );
        })}
      </div>
    );
  }
}

export default Rating;
