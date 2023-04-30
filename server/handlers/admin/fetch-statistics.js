const { database } = require("../../database/db_connect");

function FetchStatistics(request, result)
{
  database.query(`
    SELECT
      MAX(total_logins) AS total_logins,
      (SELECT COUNT(*) FROM accounts) AS total_accounts,
      (SELECT COUNT(*) FROM active_chats) AS total_chats,
      (SELECT COUNT(*) FROM messages) AS total_messages_sent,
      (SELECT COUNT(*) FROM posts) AS total_posts,
      (SELECT COUNT(*) FROM post_comments) AS total_comments,
      (SELECT COUNT(*) FROM post_likes) AS total_likes,
      (SELECT COUNT(*) FROM connections) AS total_connections,
      (SELECT COUNT(*) FROM profile_reports) AS total_reports,
      (SELECT date_created FROM accounts ORDER BY id, date_created LIMIT 1) AS first_user_created
    FROM
      statistics`,

    (error, response) => {
      if (error) return result.status(500).json({ error: error });
      else return result.status(200).json(response.rows[0]);
    }
  );
}
module.exports = { FetchStatistics }