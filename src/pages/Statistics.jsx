import GitHubStats from "../components/GitHubStats";
import CodeforcesStats from "../components/CodeforcesStats";

const Statistics = () => {
    return (
        <div>
            {/* Your services content will go here */}
            <div id="github">
                <GitHubStats />
            </div>
            <div id="codeforces">
                <CodeforcesStats />
            </div>

        </div>
    );
};

export default Statistics;