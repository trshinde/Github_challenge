Steps to run the application

1) route to the appropriate folder of the application and use command "npm run" to view it on LocalHost: 3000

2) Initial screen will only see " Top 10 stories". Because of 3 fetch api calls used, it's getting delayed to display the result of top 10 stories and their comments respectively.
        What you can do is, go to Route.js file in which whole components is rendered, just enter once, you would see top 10 stories rendered in unordered list format and once you hit enter 2 times, you would see all comments from each of the 10 top stories. 
        I have made use of situation when there is no comments in any kids data, then it shouldn't return anything. 
        
        
    
