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

// ===== Commit Message =====

// // コミットメッセージが短すぎる場合は警告を出す
// for (c of danger.github.commits) {
//     if (c.commit.message.length < 5) {
//         warn("There is a commit with very short message: " +  c.commit.message);
//         isAllCheckPassed = false;
//     }
// }

warn("base: " + danger.github.pr.base.ref);
warn("head: " + danger.github.pr.head.ref);

// ===== Branch =====

// github.branch_for_base

// is_to_master = github.branch_for_base == 'master'
// is_to_develop = github.branch_for_base == 'develop'

// is_from_develop = github.branch_for_base == 'develop'
// is_from_feature = 


// is_to_release = !!github.branch_for_base.match(/release-[0-9]+\.[0-9]+\.[0-9]/)
// is_from_release = !!github.branch_for_head.match(/release-[0-9]+\.[0-9]+\.[0-9]/)

// if is_to_master && !is_from_release
//   warn('masterへmerge出来るのはrelease branchのみです。')
// end

// if is_to_release
//   warn('release branchに対してPRを向けないで下さい。develop branchに向けてPRを作成し、develop branchをrelease branchにmergeしてください。')
// end


// ===== Result =====

if (isAllCheckPassed) {
  markdown('## All checkes have passed :tada:');
}
