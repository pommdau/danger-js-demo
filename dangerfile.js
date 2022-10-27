// ===== Functions =====

function checkBranchNames(head_branch, base_branch) {
  // head(例: feature) -> base(例: develop)
  const template_branches = ["release", "master", "main", "develop", "feature/", "revert/", "hotfix/"];

  // ブランチ名が想定する名称かどうかの確認
  is_valid_head_branch_name = false;
  for (const template_branch of template_branches) {
    if (head_branch.startsWith(template_branch)) {
      is_valid_head_branch_name = true;
      break;
    }
  }

  if (!is_valid_head_branch_name) {
    // warn(`ブランチ名が不正です: ${head_branch}\n次のいずれかの名称を使用してください: \n${template_branch_names.join(' ')}`);
    fail(`ブランチ名が不正です: ${head_branch}\n次のいずれかの名称を使用してください: \n${template_branches.join(' ')}`);
  }

  // ブランチ名とマージの整合性確認
  // 仮に誤ってdevelop -> featureとしてしまったときに検出させるとか。
  // TODO...
}

// ===== Entry Point =====


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

checkBranchNames(danger.github.pr.head.ref, danger.github.pr.base.ref)

// ===== Result =====

if (isAllCheckPassed) {
  markdown('## All checkes have passed :tada:');
}
