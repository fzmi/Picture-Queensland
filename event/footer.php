<article id="map-data">
        <section class="map-button">
            <button class="map-button-leaderboard">Leaderboard</button>
            <button class="map-button-random">Play Random</button>
        </section>
    </article>

    <section class="game-canvas">
        <div class="drop-zone">
            <div class="drop-zone-background"></div>
            <section class="drop-zone-info">
                <h3>How to play</h3>
                <p>You will be able to unlock the image after the completion of this Jigsaw Puzzle. You can choose to enter 
                    your name and ranked on the score board according to the time spent to complete. In other case, you can 
                    select ‘Don’t show my name’ To anonymously complete the game. Good luck!</p>
            </section>
            <section class="drop-zone-paused">
                <h3>Game Paused</h3>
                <p>Touch the "Resume" button to continue.</p>
            </section>
            <section class="drop-zone-puzzles">
                <iframe class="game" id="the-game" src="../puzzle/index.php"></iframe>
            </section>
            <section class="drop-zone-description">
                <h3>Title</h3>
                <p>Description</p>
            </section>
        </div>
        <div class="info-zone">
            <h3 class="info-zone-timer">0.0</h3>
            <section class="info-zone-button">
                <button id="game-start">Start</button>
                <button id="game-restart" title="Restart">
                    <img src="../images/icons/challenge-reload.png" alt="Change Image">
                </button>
                <button id="game-give-up" title="Give up"><img src="../images/icons/challenge-give-up.png" alt="Give Up"></button>
            </section>
            <section class="info-zone-result">
                <h3>Congratulations!</h3>
                <p>Please enter your name to be on the leaderboard.</p>
                <form>
                    <input type="text" name="name" placeholder="Your name..." id="info-zone-result-name" autofocus><br>
                    <section class="info-zone-result-button">
                        <input type="submit" value="Submit" id="info-zone-result-button-submit">
                        <input type="submit" value="Don't show my name" id="info-zone-result-button-ignore">
                    </section>
                </form>
            </section>
            <section class="info-zone-result2">
                <h3>Congratulations, time traveller!</h3>
            </section>
            <section class="info-zone-hi-score">
                <h3>Leaderboard</h3>
                <table>
                    <tr><th>#</th><th>Name</th><th>Score</th><th>Time</th></tr>
                    <tr><td>1</td><td>Never</td><td>17.8s</td><td>1 day ago</td></tr>
                    <tr><td>2</td><td>Gonna</td><td>17.9s</td><td>15 minutes ago</td></tr>
                    <tr><td>3</td><td>Give</td><td>18.1s</td><td>3 hours ago</td></tr>
                    <tr><td>4</td><td>You</td><td>18.2s</td><td>2 hours ago</td></tr>
                    <tr><td>5</td><td>Up</td><td>18.4s</td><td>1 day ago</td></tr>
                </table>
            </section>
        </div>
    </section>

    <section id="map-popup-overlay">
        <img src="" alt="Event Picture">
        <h3>Title</h3>
        <p>Description</p>
        <p>touch anywhere to close</p>
    </section>

    <section id="story-popup-overlay">
        <article>
            <section>
                <img src="" alt="Event Picture" class="story-popup-overlay-image">
                <article class="story-popup-overlay-text">
                        <p class="story-popup-overlay-story">Story</p>
                        <strong class="story-popup-overlay-description">Description</strong>
                        <p>touch anywhere to close</p>
                </article>
            </section>
        </article>
    </section>

    <section id="trophy-popup-overlay">
        <button title="Close">
            <img src="../images/icons/delete-icon.png" alt="Close" id="trophy-popup-overlay-close">
        </button>
        <img alt="Trophy" class="trophy-popup-image">
        <h3>Locked</h3>
    </section>

    <section id="leaderboard-popup-overlay">
        <button title="Close">
            <img src="../images/icons/delete-icon.png" alt="Close" id="trophy-popup-overlay-close">
        </button>
        <h3>Leaderboard</h3>
        <table id="leaderboard-info">
            <tr><th>POS</th><th>NAME</th><th>SCORE</th><th>TIME</th></tr>
            <tr><td>1</td><td>Never</td><td>17.8s</td><td>1 day ago</td></tr>
            <tr><td>2</td><td>Gonna</td><td>17.9s</td><td>15 minutes ago</td></tr>
            <tr><td>3</td><td>Give</td><td>18.1s</td><td>3 hours ago</td></tr>
            <tr><td>4</td><td>You</td><td>18.2s</td><td>2 hours ago</td></tr>
            <tr><td>5</td><td>Up</td><td>18.4s</td><td>1 day ago</td></tr>
        <table>
    </section>

    <footer>
        <script src="../js/jquery-3.4.1.min.js"></script>
        <script src="../js/leaflet.js"></script>
        <script src="../js/jquery-ui.min.js"></script>
        <script src="../js/script-event.js"></script>
    </footer>
</body>
</html>
