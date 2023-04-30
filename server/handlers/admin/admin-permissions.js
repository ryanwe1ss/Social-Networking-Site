const { database } = require("../../database/db_connect");

function CheckAdminPermissions(request, result)
{
  database.query(`
    SELECT
      monitor_posts_permission,
      modify_accounts_permission,
      monitor_reports_permission
    FROM
      admin_accounts
    WHERE
      id = ${request.session.user.id}`,

    (error, results) => {
      if (error) return result.sendStatus(500);
      const permissions = results.rows[0];

      return result.json({
        monitor_posts_permission: permissions.monitor_posts_permission,
        modify_accounts_permission: permissions.modify_accounts_permission,
        monitor_reports_permission: permissions.monitor_reports_permission,
      });
    }
  )
}
module.exports = { CheckAdminPermissions }