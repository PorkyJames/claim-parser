import React from 'react'
import "./ResultsTable.css";

type Insured = {
    name: string;
    internalId: string;
};

type ResultsTableItems = {
    files: File[];
    matchMap: Record<string, Insured | "No Match">;
    insureds: { name: string; internalId: string }[];
}

export default function ResultsTable ( {files, matchMap, insureds} : ResultsTableItems ) {

    //! If no files, don't show the table
    if (files.length === 0) return null;

    //! If there is no Match and the words "No Match" shows up, then create a dropdown where you can manually select the company.
    //! Also have a function where if you manually select a company, the internalId should also be filled based on the INSUREDS variable

    return (
        <>
            <div className="results-table">
                <table>

                    <thead>
                        <tr>
                            <th className="file-name">File Name</th>
                            <th className="company">Insured</th>
                            <th className="internalId">Internal ID</th>
                            <th className="confidence">Confidence %</th>
                            <th className="file-size">Size</th>
                        </tr>
                    </thead>

                    <tbody className="body">
                        {files.map((file, idx) => {
                            const match = matchMap[file.name];

                            return (
                                <tr key={idx}>
                                <td>{file.name}</td>
                                <td>{match && match !== "No Match" ? match.name : "No Match"}</td>
                                <td>{match && match !== "No Match" ? match.internalId : "N/A"}</td>
                                <td>Confidence %</td>
                                <td>{file.size} bytes</td>
                                </tr>
                            );
                        })}
                    </tbody>

                </table>
            </div>
        </>
    )
}
