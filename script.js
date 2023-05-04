async function getMatchData() {

    return await fetch("https://api.cricapi.com/v1/currentMatches?apikey=b684d419-10c0-4899-aea9-3aa0999c750c&offset=0")
        .then(data => data.json())
        .then(data => {
            if (data.status != "success")return;

            const matchesList = data.data;

            if(!matchesList)return [];
            
            //add your api key from cricketdata.org
            const relevantData = matchesList.filter(match => match.series_id == "c75f8952-74d4-416f-b7b4-7da4b4e3ae6e")
                                            .map(match => {
                                                // Find the team objects from the teamInfo array based on their names
                                                 const team1 = match.teamInfo.find(team => team.name === match.teams[0]);
                                                 const team2 = match.teamInfo.find(team => team.name === match.teams[1]);
                                                 
                                                // Find the score and wickets for each team from the score array
                                                const team1Score = match.score.find(score => score.inning.includes(team1.name));
                                                const team1ScoreString = team1Score ? `${team1Score.r}/${team1Score.w}` : '-';
                                            
                                                const team2Score = match.score.find(score => score.inning.includes(team2.name));
                                                const team2ScoreString = team2Score ? `${team2Score.r}/${team2Score.w}` : '-';
                                                 

                                                 // Create a string with the team images and match data
                                                 return `
                                                 <li class="match-card">
                                                   <div class="match-info">
                                                     <div class="match-status">${match.matchStarted ? 'LIVE' : 'UPCOMING'}</div>
                                                    <div class="match-time"><b>${match.date}</b></div>
                                                  
                                                     <div class="team-logo">
                                                       <img src="${team1.img}" width="40" height="40" alt="${team1.name} logo">
                                                       <div class="team-name">${team1.shortname}</div>
                                                       <div class="team-score">${team1ScoreString}</div>
                                                     </div>
                                                     <div class="team-logo">
                                                       <img src="${team2.img}" width="40" height="40" alt="${team2.name} logo">
                                                       <div class="team-name">${team2.shortname}</div>
                                                       <div class="team-score">${team2ScoreString}</div>
                                                     </div>

                                                     <div class ="match-statu">
                                                       <b>${match.status}</b>
                                                     </div>
                                                   </div>
                                                   <div class="match-action">
                                                     <button class="btn btn-primary">Watch Now</button>
                                                   </div>
                                                 </li>
                                               `;
                                             });

            console.log({relevantData});

            document.getElementById("matches").innerHTML = relevantData.join('');

            return relevantData;

        })
        .catch(e => console.log(e));
}

getMatchData();