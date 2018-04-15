import React, {Component} from 'react';
import {PieChart, Pie, Legend, Tooltip, Cell} from 'recharts';
import {Card, CardText, CardHeader} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import AddMoneyButton from './button-add-money';

const style = {
  height: 300,
  width: 300,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};


class Balance extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [{name: 'Income($)', value: 400}, {name: 'Expense($)', value: 300}],
      colors: ['#0088FE', '#FFBB28'],
      isLoading: true,
      myBalance:{}
    };
  }

  renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };


  componentWillMount(){
    const storedToken = localStorage.getItem('token');

    if ( storedToken ) {
      const token = JSON.parse(storedToken);
      const url = `${process.env.REACT_APP_API_URL}/balance`;
      fetch(url, {
        method: 'GET',
        headers: new Headers({'Authorization': token}),
      })
        .then(response => response.json())
        .then(json => {
          this.setState({
            isLoading: false,
            myBalance: json,
            data: [{name: 'Income($)', value: json.income}, {name: 'Expense($)', value: json.expense}]
          });
        })
        .catch(e => {
          console.error(e);
        });
    }
  }


  render() {
    return (
      <div>
        {!this.state.isLoading &&(
          <div>
        <Paper style={style}>
          <Card>
            <CardText>
              Income and Expense
            </CardText>
          </Card>
          <PieChart width={290} height={300}>
            <Pie
              data={this.state.data}
              cx={145}
              cy={100}
              dataKey={"value"}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              label={this.renderCustomizedLabel}
            >
              {
                this.state.data.map(
                  (entry, index) => <Cell key={index} fill={this.state.colors[index % this.state.colors.length]}/>)
              }
            </Pie>
            <Tooltip/>
          </PieChart>
        </Paper>
        <Card style={style}>
          <Card>
            <CardText>
              My Balance
            </CardText>
          </Card>
          <CardText>
            Total: ${this.state.myBalance.total}
          </CardText>
          <CardText>
            Income: ${this.state.myBalance.income}
          </CardText>
          <CardText>
            Expense: ${this.state.myBalance.expense}
          </CardText>
          <AddMoneyButton/>
        </Card>
          </div>
        )}
      </div>
    )
  }
}

export default Balance;