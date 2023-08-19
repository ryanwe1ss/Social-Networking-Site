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
        {args.postReports.map((report) => (
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
        ))}
      </tbody>
    </table>
  );
}
export default PostReports;