const { database } = require("../../../database/database");

function FetchCommentReports(request, result)
{
  const searchQuery = request.query.searchQuery;
  database.query(`
    SELECT
      comment_reports.id,
      JSON_BUILD_OBJECT(
        'id', reporter_id,
        'username', reporter.username
      ) AS reporter,
      JSON_BUILD_OBJECT(
        'id', reporter_id,
        'username', reported.username
      ) AS reported,
      JSON_BUILD_OBJECT(
        'id', comment_id,
        'comment', post_comments.comment
      ) AS comment,
      JSON_BUILD_OBJECT(
        'id', posts.creator_id,
        'post_id', post_id,
        'file', posts.file_name
      ) AS post,
      JSON_BUILD_OBJECT(
        'id', comment_reports.reason,
        'name', report_reasons.reason
      ) AS reason,
      comment_reports.additional_information,
      comment_reports.date_created
    FROM
      comment_reports
    LEFT JOIN
      accounts AS reporter ON reporter.id = comment_reports.reporter_id
    LEFT JOIN
      accounts AS reported ON reported.id = comment_reports.reported_id
    LEFT JOIN
      post_comments ON post_comments.id = comment_reports.comment_id
    LEFT JOIN
      posts ON posts.id = post_comments.post_id
    LEFT JOIN
      report_reasons ON report_reasons.id = comment_reports.reason
    WHERE
      reporter.username ILIKE '%${searchQuery}%' OR
      reported.username ILIKE '%${searchQuery}%' OR
      post_comments.comment ILIKE '%${searchQuery}%' OR
      report_reasons.reason ILIKE '%${searchQuery}%' OR
      additional_information LIKE '%${searchQuery}%'`,

    (error, reports) => {
      if (error) return result.sendStatus(500);
      return result.send(reports.rows);
    }
  );
}
module.exports = { FetchCommentReports }