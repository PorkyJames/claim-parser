import "./ResultsTable.css";

type ResultsTableItems = {
    files: File[]
}

export default function ResultsTable ( {files} : ResultsTableItems ) {

    return (
        <>
            <div className="results-table">
                <table>
                    <thead>
                        <tr>
                            <th className="file-name">File Name</th>
                            <th className="company">Insured</th>
                            <th className="internalId">Internal ID</th>
                            <th className="file-size">Size</th>
                        </tr>
                    </thead>
                    <tbody className="body">
                        {files.map((file, idx) => (
                            <tr key={idx}>
                                <td>{file.name}</td>
                                {/* Insert Parsed Company Info here */}
                                {/* Also Allow for Selection if less than .8 match */}
                                <td>Company Name</td>
                                {/* Insert Parsed Internal ID here */}
                                <td>Internal Id</td>
                                <td>{file.size} bytes</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
