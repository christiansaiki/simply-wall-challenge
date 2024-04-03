
import { useQuery } from '@apollo/client';
import { COMPANIES_QUERY } from '../queries/company';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { transformCompaniesResponse } from '../util/util';

const CompaniesTable = () => {
    const { loading, error, data } = useQuery(COMPANIES_QUERY);

    const columns = [
      { field: 'name', headerName: 'Name', width: 200 },
      { field: 'uniqueSymbol', headerName: 'Unique Symbol', width: 150 },
      { field: 'exchangeSymbol', headerName: 'Exchange Symbol', width: 150 },
      { field: 'snowflakeScore', headerName: 'Snowflake Score', width: 150 },
      { field: 'lastSharePrice', headerName: 'Last Share Price', width: 150 },
    ];

    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>Error: {error.message}</p>;
    }

    const rows = transformCompaniesResponse(data);

    return (
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          }
        }}
        pageSizeOptions={[10, 25, 100]}
      />
    );
  }

export default CompaniesTable;


