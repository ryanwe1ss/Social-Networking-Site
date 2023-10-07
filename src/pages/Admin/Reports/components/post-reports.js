function PostReports(args) {
  return (
    <table>
      <thead>
        <tr>
          <th>Reporter</th>
          <th>Post</th>
          <th>Reason</th>
          <th>Additional Information</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {args.reports.length > 0 && args.reports.map((report) => (
          <tr key={report.id}>
            <td className="reporter">
              <a href={`/profile/${report.reporter.username}`}>{report.reporter.username}</a>
            </td>
            <td className="post">
              <a href={`/post?profileId=${report.post.id}&postId=${report.post.post_id}&post=${report.post.file}`}>{report.post.post_id}</a>
            </td>
            <td className="reason">
              {report.reason}
            </td>
            <td className="additional-information">
              {report.additional_information}
            </td>
            <td className="date">
              {new Date(report.date_created).toLocaleString()}
            </td>
          </tr>
        )) || (
          <tr>
            <td colSpan="5">
              <center><h5 style={{marginTop: '10px'}}>No Reports Found</h5></center>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
export default PostReports;