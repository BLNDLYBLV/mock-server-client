import React from 'react';
import {FormControl, TextField, InputLabel, Select, MenuItem, Tooltip, Typography} from '@material-ui/core';
import {useSelector} from 'react-redux';

import {getValues, getSchemas} from '../../../reducers/possibleValues';

interface Props {
    type: string;
    value: any;
    update: any;
    ind: number;
    classes: {
        [key: string]: string;
    };
    url_params: string[];
}

export const ValueField = React.memo(({type, value, update, ind, classes, url_params}: Props) => {
    const schemas = useSelector(getSchemas);
    const values = useSelector(getValues);
    return (
        <FormControl>
            {type === 'query_param' ? (
                <TextField
                    label="Name"
                    value={value}
                    variant="outlined"
                    onChange={(e: any) => update(e.target.value, 'value', ind)}
                />
            ) : (
                <>
                    <InputLabel id={`field-value-${ind}`}>Value</InputLabel>
                    <Select
                        labelId={`field-value-${ind}`}
                        id={`field-value-select-${ind}`}
                        value={value}
                        onChange={(e) => update(e.target.value, 'value', ind)}>
                        {type === 'schema'
                            ? schemas.map((schema) => (
                                  <MenuItem key={schema.name} value={schema.name}>
                                      <Tooltip
                                          title={<pre>{JSON.stringify(schema.schema, null, 4)}</pre>}
                                          classes={{tooltip: classes.toolTip}}>
                                          <Typography className={classes.toolTipText}>{schema.name}</Typography>
                                      </Tooltip>
                                  </MenuItem>
                              ))
                            : type === 'value'
                            ? values.map((_val) => (
                                  <MenuItem key={_val} value={_val}>
                                      {_val}
                                  </MenuItem>
                              ))
                            : url_params.map((_val) => (
                                  <MenuItem key={_val} value={_val}>
                                      {_val}
                                  </MenuItem>
                              ))}
                    </Select>
                </>
            )}
        </FormControl>
    );
});
