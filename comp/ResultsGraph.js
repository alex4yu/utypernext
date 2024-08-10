import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ResultsGraph = ({ data }) => {
    const wpmData = [
        { time: 1, wpm: 20 },
        { time: 2, wpm: 35 },
        { time: 3, wpm: 45 },
        // Add more data points
    ];
    return (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 80 }}
            >
                <CartesianGrid stroke="#002f63" />
                <XAxis 
                    dataKey="time" 
                    axisLine={{ stroke: '#ffc300', strokeWidth: 3 }}  // Color and width of the X-axis line
                    tickLine={false} 
                    tick={{ //axis label
                        fill: '#ffc300',         // Label color
                        fontSize: 14,         // Font size
                        fontFamily: 'Nunito',  // Font family
                    }}
                    label={{ //axis name
                        value: 'Time (seconds)',   
                        position: 'insideBottom',   
                        offset: -20,                   
                        fill: '#ffc300',                
                        fontSize: 18,               
                        fontFamily: 'Arial',          
                    }}
                />

                <YAxis 
                    axisLine={{ stroke: '#ffc300', strokeWidth: 3 }}  // Color and width of the Y-axis line
                    tickLine={false} 
                    tick={{ 
                        fill: '#ffc300',         
                        fontSize: 14,            
                        fontFamily: 'Nunito',  
                    }}
                    label={{ 
                        value: 'Words per Minute',   
                        angle: -90,                  
                        position: 'outsideLeft',       
                        dx: -20,                 
                        fill: '#ffc300',            
                        fontSize: 18,                
                        fontFamily: 'Nunito',          
                    }}
                />
                <Tooltip />
                <Line type="monotone" dataKey="wpm" stroke="#ffc300" strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default ResultsGraph;
