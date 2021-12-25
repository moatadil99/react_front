import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import {DataGrid} from '@material-ui/data-grid';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }

function QuickSearchToolbar(props) {
    return (
      <Box
        sx={{
          p: 0.5,
          pb: 0,
          justifyContent: 'space-between',
          display: 'flex',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
       
        <TextField
          variant="standard"
          value={props.value}
          onChange={props.onChange}
          placeholder="Search…"
          InputProps={{
            startAdornment: <SearchIcon fontSize="small" />,
            endAdornment: (
              <IconButton
                title="Clear"
                aria-label="Clear"
                size="small"
                style={{ visibility: props.value ? 'visible' : 'hidden' }}
                onClick={props.clearSearch}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            ),
          }}
          sx={{
            width: {
              xs: 1,
              sm: 'auto',
            },
            m: (theme) => theme.spacing(1, 0.5, 1.5),
            '& .MuiSvgIcon-root': {
              mr: 0.5,
            },
            '& .MuiInput-underline:before': {
              borderBottom: 1,
              borderColor: 'divider',
            },
          }}
        />
             <Button className="bg-dark" onClick={(props.reload)}> refresh </Button> 

      </Box>
    );
  }
  
  QuickSearchToolbar.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  };
const columns =[
    {field: 'entry_timestamp',headerName: 'Logged At',width:150},
    {field: 'not_before',headerName: 'Not Before',width:150},
    {field: 'common_name',headerName: 'Common Name',width:180},
    {field: 'name_value',headerName: 'Matching Identities',width:300},
    {field: 'issuer_name',headerName: 'Issuer Name',width:1000},
    
]

function CertData() {

    const[tableData,setTableData] = useState([]);
    const[filterdData,setFilterdData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const getCerts = async () => {
        try {
            const Cert= await
            axios.get("http://127.0.0.1:8000/api/cer")
        setTableData(Cert.data);  // set State
        setFilterdData(Cert.data);        
        } catch (err) {
          console.error(err.message);
        }
      };
      const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = tableData.filter((row) => {
          return Object.keys(row).some((field) => {
            return searchRegex.test(row[field].toString());
          });
        });
        setFilterdData(filteredRows);
      };
    useEffect(() => {
        getCerts();
    },[])
    const filterdDataHandler = () => {
        getCerts();
    }
    
    return (
      <>
      <h1> Data Table for All Certificates</h1>
        <div></div>
        <Box sx={{ height: 700, width: 1 }}>             
            <DataGrid
                rows={filterdData}
                columns={columns}
                components={{ Toolbar: QuickSearchToolbar }}
                rowHeight={55}
                rowsPerPageOptions={[5, 10, 20,50,75,100]}
                componentsProps={{
                toolbar: {
                    value: searchText,
                    onChange: (event) => requestSearch(event.target.value),
                    clearSearch: () => requestSearch(''),
                    reload:() => filterdDataHandler()
                    
                },
                }}

            />
        </Box>
    </>
    )
}

export default CertData
