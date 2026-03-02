const cp = require('child_process');

const envFilter = `export GIT_COMMITTER_NAME="DECTYCLAW"; export GIT_AUTHOR_NAME="DECTYCLAW"; export GIT_COMMITTER_EMAIL="263858794+dectyclaw@users.noreply.github.com"; export GIT_AUTHOR_EMAIL="263858794+dectyclaw@users.noreply.github.com";`;

try {
    console.log("Setting local git config...");
    cp.execSync('git config user.name "DECTYCLAW"');
    cp.execSync('git config user.email "263858794+dectyclaw@users.noreply.github.com"');

    console.log("Rewriting git history unconditionally...");
    const cmd = `git filter-branch -f --env-filter '${envFilter}' -- --all`;
    cp.execSync(cmd, { stdio: 'inherit' });

    console.log("Force pushing to GitHub...");
    cp.execSync('git push origin main --force', { stdio: 'inherit' });

    console.log("Done!");
} catch (e) {
    console.error("Error updating history:", e.message);
}
