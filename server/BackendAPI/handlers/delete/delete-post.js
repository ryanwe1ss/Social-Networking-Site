const { database } = require("../../database/db_connect");

function DeletePost(request, result)
{
  database.query(`
    SELECT file_name FROM posts
    WHERE id = ${request.params.postId}`,
    
    (error, data) => {
      if (error) return result.sendStatus(500);
      const fileName = data.rows[0].file_name;

      database.query(`
        DELETE FROM posts
        WHERE file_name = '${fileName}'`,

        (error, _) => {
          if (error) return result.sendStatus(500);
          result.send({
            session: request.session.user,
            fileName: fileName,
          });
        }
      );
    }
  );
}
module.exports = { DeletePost }