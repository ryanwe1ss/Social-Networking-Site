const fs = require("fs");
const { database } = require("../../database/db_connect");

function FetchNotifications(request, result)
{
  const notifications = [];

  if (request.query.countOnly) {
    database.query(`
      SELECT
        COUNT(*) AS count
      FROM
        follow_requests
      WHERE
        account_id = ${request.session.user.id} AND
        accepted = FALSE AND
        declined = FALSE`,

      function(error, data) {
        if (!error) result.send(data.rows[0]);
        else result.sendStatus(500);
      }
    );
  
  } else {
    database.query(`
      SELECT
        CAST(follow_requests.id AS INT),
        JSON_BUILD_OBJECT(
          'id', account_id,
          'username', username,
          'name', name
        ) AS account,
        JSON_BUILD_OBJECT(
          'id', follower_id,
          'username', (SELECT username FROM accounts WHERE id = follower_id),
          'name', (SELECT name FROM accounts WHERE id = follower_id)
        ) AS follower,
        accepted,
        declined,
        follow_requests.date_created
      FROM
        accounts
      LEFT JOIN
        follow_requests ON follow_requests.account_id = accounts.id
      WHERE
        (SELECT is_enabled FROM accounts WHERE id = follower_id) AND
        follow_requests.account_id = ${request.session.user.id} AND
        is_enabled = TRUE
      ORDER BY
        follow_requests.date_created DESC`,
    
      function(error, followRequests) {
        if (!error) {
          notifications.push(followRequests.rows);

          database.query(`
            SELECT
              CAST(post_comments.id AS INT),
              (SELECT JSON_BUILD_OBJECT(
                'id', id,
                'username', username
              ) AS commenter
                FROM accounts
                WHERE id = commenter
              ),
              (SELECT JSON_BUILD_OBJECT(
                'id', posts.id,
                'account', JSON_BUILD_OBJECT(
                  'id', id,
                  'username', username
                )
              ) AS post
                FROM accounts
                WHERE id = ${request.session.user.id}
              ),
              posts.file_path,
              post_comments.comment,
              post_comments.date_created
            FROM
              posts
            LEFT JOIN
              post_comments ON post_comments.post_id = posts.id
            WHERE
              (SELECT is_enabled FROM accounts WHERE id = commenter) AND
              post_comments.id IS NOT NULL AND
              creator_id = ${request.session.user.id} AND
              commenter != ${request.session.user.id}`,

            function(error, comments) {
              if (!error) {
                comments.rows.forEach(comment => {
                  comment.post.image = fs.readFileSync(comment.file_path, "base64");
                });
  
                notifications.push(comments.rows);
                database.query(`
                  SELECT
                    CAST(post_likes.id AS INT),
                    (SELECT JSON_BUILD_OBJECT(
                        'id', posts.id,
                        'account', JSON_BUILD_OBJECT(
                          'id', id,
                          'username', username
                        )
                      ) AS post
                        FROM accounts
                        WHERE id = ${request.session.user.id}
                      ),
                    (SELECT JSON_BUILD_OBJECT(
                        'id', id,
                        'username', username
                      ) AS liker
                        FROM accounts
                        WHERE id = liker
                      ),
                    posts.file_path,
                    post_likes.date_created
                  FROM
                    posts
                  LEFT JOIN
                    post_likes ON post_likes.post_id = posts.id
                  WHERE
                    (SELECT is_enabled FROM accounts WHERE id = liker) AND
                    post_likes.id IS NOT NULL AND
                    creator_id = ${request.session.user.id} AND
                    liker != ${request.session.user.id}`,

                  function(error, likes) {
                    if (!error) {
                      likes.rows.forEach(like => {
                        like.post.image = fs.readFileSync(like.file_path, "base64");
                      });

                      notifications.push(likes.rows);
                      result.send(notifications);
                    }
                    else return result.sendStatus(500);
                  }
                )
              }
              else return result.sendStatus(500);
            }
          )
        }
        else return result.sendStatus(500);
      }
    );
  }
}
module.exports = { FetchNotifications }