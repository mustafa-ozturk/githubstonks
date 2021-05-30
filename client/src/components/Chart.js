import React, { PureComponent } from "react";
import { LineChart, Line, Tooltip, ResponsiveContainer } from "recharts";

export default class Example extends PureComponent {
    render() {
        return (
            <ResponsiveContainer width="100%" height="85%">
                <LineChart
                    width={500}
                    height={300}
                    data={this.props.priceHistory}
                >
                    <Tooltip
                        separator=""
                        cursor={false}
                        labelFormatter={() => ""}
                    />
                    <Line
                        type="linear"
                        dataKey="$"
                        stroke="rgb(14, 184, 239)"
                        dot={false}
                        strokeWidth={3}
                    />
                </LineChart>
            </ResponsiveContainer>
        );
    }
}
