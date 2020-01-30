import * as React from 'react';
import * as profiles from '../../../profiles.json';
import { connect } from 'react-redux';
import { TableState } from '../../reducers/table';

type Props = {};
type State = {};

type StoreProps = TableState;
type StoreDispatch = {
    onTableUpdate?: (table: TableState) => void;
};

type Profile = {
    [key: string]: string | number | boolean;
};

const PROFILES: Array<Profile> = profiles;

class Table extends React.Component<Props & StoreProps & StoreDispatch, State> {
    getSortedData = (): Array<Profile> => {
        const { column, sort, reverse } = this.props;
        const sortedByColumn = field => (a, b) => a[field] > b[field] ? -1 : 1;

        switch (sort) {
            case 'abc':
                const sorted = PROFILES.sort(sortedByColumn(column));
                return reverse ? sorted.reverse() : sorted;
            default:
                return PROFILES;
        }
    };

    renderData() {
        return this.getSortedData().map(profile => {
            const id = btoa(JSON.stringify(profile));

            return (
                <tr key={id}>
                    {Object.values(profile).map(value => (
                        <td key={`${id}-${value}`}>{value}</td>
                    ))}
                </tr>
            )
        })
    }

    onColumnClick = column => () => {
        const { reverse, onTableUpdate } = this.props;

        onTableUpdate({ column, sort: 'abc', reverse: !Boolean(reverse) });
    }


    render() {

        const columns = Object.keys(PROFILES.reduce((acc, curr) => ({ ...acc, ...curr }), {}));
        return (
            <div className="table-wrapper">

                <h1 className="title">Amazing Hiring Test Table</h1>
                <table className="table-content">
                    <tbody>
                        <tr>
                            {columns.map(column => (
                                <th key={column} onClick={this.onColumnClick(column)}>
                                    {column.toUpperCase()}
                                </th>
                            ))}
                        </tr>
                        {this.renderData()}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state): StoreProps => ({
    column: state.table.column,
    sort: state.table.sort,
    reverse: state.table.reverse
});

const mapDispatchToProps = dispatch => ({
    onTableUpdate: (table) => dispatch({ type: 'TABLE/SET', value: table })
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
