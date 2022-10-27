let isAllCheckPassed = true;

// ===== Title =====

// PRのタイトルに[WIP]が含まれる場合は、作業中なのでfailさせる
if (danger.github.pr.title.includes('[WIP]')) {
  fail("Should NOT inclued 'WIP' in your PR title");
}

// PRのタイトルに課題番号が含まれているかどうか(DEV_1-XXX)
const hasIssuesNumber = /DEV_1-[0-9]/.test(danger.github.pr.title);
if (!hasIssuesNumber) {
  warn("Should include issues number in your PR title");
  isAllCheckPassed = false;
}

// ===== Settings =====

// PRにレビュアーが指定されているかどうか
if (!danger.github.pr.reviews) {
  warn("Should select PR reviewer");
  isAllCheckPassed = false;
}

// PRにassigneesが指定されているかどうか
if (!danger.github.pr.assignee) {
  warn("Should select PR assignees");
  isAllCheckPassed = false;
}

// ===== Changing amount =====

// 500行以上の追加・削除の変更があったかどうか
const diffSize = Math.max(danger.github.pr.additions, danger.github.pr.deletions);
if (diffSize > 500) {
  warn("Should reduce diffs less than 500");
  isAllCheckPassed = false;
}

// 変更したファイルの数が10より多いかどうか
if (danger.github.pr.changed_files > 10 ) {
  warn("Should reduce change files less than 10");
  isAllCheckPassed = false;
}

// ===== Branch =====

// head(例: feature) -> base(例: develop)
const template_branch_names = ["release", "master", "main", "develop", "feature", "revert", "hotfix"];
// base_branch =  danger.github.pr.base.ref
head_branch_name =  danger.github.pr.head.ref;

is_valid_branch_name = false
for (const template_branch_name of template_branch_names) {  
  if (head_branch_name.startsWith(template_branch_name)) {
    is_valid_branch_name = true;
    break;
  }
}

if (!is_valid_branch_name) {
  warn(`ブランチ名が不正です: ${head_branch}\n次のいずれかの名称を使用してください: ${valid_branch_names.join('/')}`);
}

// ===== Result =====

if (isAllCheckPassed) {
  markdown('## All checkes have passed :tada:');
}
