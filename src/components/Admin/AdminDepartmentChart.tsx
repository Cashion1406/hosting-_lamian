import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar, Tooltip } from "recharts";

const data = [
  {
    dep_name: 'Dep 1',
    ideas: 24,
  },
  {
    dep_name: 'Dep 2',
    ideas: 13,
  },
  {
    dep_name: 'Dep 3',
    ideas: 98,
  },
  {
    dep_name: 'Dep 4',
    ideas: 39,
  },
  {
    dep_name: 'Dep 5',
    ideas: 48,
  },
];
const AdminDepartmentChart: React.FC = () => {
  const sortedData = data.sort((a,b) => a.ideas - b.ideas)
    return(
        <>
        <Box p="14px 8px" borderBottom="2px solid" borderColor="white">
          <Text fontSize={22} fontWeight={900} >Top 5 Department</Text>
        </Box>
        <Flex
        border='1px solid'
        direction="column"
        borderColor='brand.900'>
         <ResponsiveContainer width="100%" aspect={0.9} >
        <BarChart
          width={100}
          height={100}
          data={sortedData}
         
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis fontSize={12} tickMargin={8} dataKey="dep_name" />
          <YAxis fontSize={12} />
          <Tooltip />
          <Legend />
          <Bar dataKey="ideas" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
        </Flex>
        </>
    )
};
export default AdminDepartmentChart;