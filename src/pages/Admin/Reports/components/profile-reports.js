function ProfileReports(args) {
  return (
    <table>
      <thead>
        <tr>
          <th>Reporter</th>
          <th>Account</th>
          <th>Reason</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {args.reports.length > 0 && args.reports.map((report) => (
          <tr key={report.id}>
            <td className="reporter">
              <a href={`/profile/${report.reporter.username}`}>{report.reporter.username}</a>
            </td>
            <td className="reported">
              <a href={`/profile/${report.reported.username}`}>{report.reported.username}</a>
            </td>
            <td className="reason">
              {report.message}
            </td>
            <td className="date">
              {new Date(report.date_created).toLocaleString()}
            </td>
          </tr>
        )) || (
          <tr>
            <td colSpan="4">
              <center><h5 style={{marginTop: '10px'}}>No Reports Found</h5></center>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
export default ProfileReports;