let isAllCheckPassed = true;

if (danger.github.pr.title.includes('[WIP]')) {
  fail("Should NOT inclued 'WIP' in your PR title");
}

if (!danger.github.pr.assignee) {
  warn("Should select PR reviewer");
  isAllCheckPassed = false;
}

const hasIssuesNumber = /#[0-9]/.test(danger.github.pr.title);
if (!hasIssuesNumber) {
  warn("Should include issues number in your PR title");
  isAllCheckPassed = false;
}

const diffSize = Math.max(danger.github.pr.additions, danger.github.pr.deletions);
if (diffSize > 500) {
  warn("Should reduce diffs less than 500");
  isAllCheckPassed = false;
}

if (danger.github.pr.changed_files > 10 ) {
  warn("Should reduce change files less than 10");
  isAllCheckPassed = false;
}

if (isAllCheckPassed) markdown('## All checkes have passed :tada:')
