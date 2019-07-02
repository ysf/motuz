import React from 'react';
import { Modal, Button } from 'react-bootstrap'
import classnames from 'classnames';

const CONNECTION_TYPES = [
    {
        label: 'Amazon Simple Storage Service (s3)',
        value: 's3',
    },
    {
        label: 'Azure Blob Storage',
        value: 'azureblob',
    },
    // {
    //     label: 'Google Cloud Bucket',
    //     value: 'google cloud storage',
    // },
]


class CloudConnectionDialogFields extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = CloudConnectionDialogFields.initialState;
    }

    render() {
        const { data, errors } = this.props;
        const type = this.state.type || this.props.data.type

        return (
            <div className="container">
                <h5 className="text-primary mb-2">Details</h5>

                <input type="hidden" name='id' value={data.id}/>

                <div className="row form-group">
                    <div className="col-4 text-right">
                        <b>Type</b>
                    </div>
                    <div className="col-8">
                        <select
                            className="form-control"
                            name="type"
                            value={type}
                            onChange={(event => this.setState({type: event.target.value}))}
                        >
                            {CONNECTION_TYPES.map(d => (
                                <option
                                    key={d.value}
                                    value={d.value}
                                >{d.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {this._name()}
                {this._bucket()}
                {this._region()}

                <h5 className='text-primary mt-5 mb-2'>Credentials</h5>

                {this._accessKeyId()}
                {this._accessKeySecret()}
            </div>
        );
    }

    componentDidMount() {

    }

    _name() {
        const { data, errors } = this.props;
        const type = this.state.type || this.props.data.type

        return (
            <div className="row form-group">
                <div className="col-4 text-right">
                    <b>Name</b>
                </div>
                <div className="col-8">
                    <input
                        type="text"
                        className={classnames({
                            'form-control': true,
                            'is-invalid': errors.name,
                        })}
                        name='name'
                        defaultValue={data.name}
                    />
                    <span className="invalid-feedback">
                        {errors.name}
                    </span>
                </div>
            </div>
        );
    }

    _bucket() {
        const { data, errors } = this.props;
        const type = this.state.type || this.props.data.type

        if (type === 'azureblob') {
            return (
                <input
                    type="hidden"
                    name='bucket'
                    value='-'
                />
            )
        }

        return (
            <div className="row form-group">
                <div className="col-4 text-right">
                    <b>Bucket</b>
                </div>
                <div className="col-8">
                    <input
                        type="text"
                        className={classnames({
                            'form-control': true,
                            'is-invalid': errors.bucket,
                        })}
                        name='bucket'
                        defaultValue={data.bucket}
                    />
                    <span className="invalid-feedback">
                        {errors.bucket}
                    </span>
                </div>
            </div>
        );
    }

    _region() {
        const { data, errors } = this.props;
        const type = this.state.type || this.props.data.type

        if (type === 'azureblob') {
            return (
                <input
                    type="hidden"
                    name='region'
                    value='-'
                />
            )
        }

        return (
            <div className="row form-group">
                <div className="col-4 text-right">
                    <b>Region</b>
                </div>
                <div className="col-8">
                    <input
                        type="text"
                        className={classnames({
                            'form-control': true,
                            'is-invalid': errors.region,
                        })}
                        name='region'
                        defaultValue={data.region}
                    />
                    <span className="invalid-feedback">
                        {errors.region}
                    </span>
                </div>
            </div>
        );
    }

    _accessKeyId() {
        const { data, errors } = this.props;
        const type = this.state.type || this.props.data.type

        let shownName = '';
        if (type === 'azureblob') {
            shownName = 'Account'
        } else {
            shownName = 'access_key_id'
        }

        return (
            <div className="row form-group">
                <div className="col-4 text-right">
                    <b>{shownName}</b>
                </div>
                <div className="col-8">
                    <input
                        type="text"
                        className={classnames({
                            'form-control': true,
                            'is-invalid': errors.access_key_id,
                        })}
                        name='access_key_id'
                        defaultValue={data.access_key_id}
                    />
                    <span className="invalid-feedback">
                        {errors.access_key_id}
                    </span>
                </div>
            </div>
        );
    }

    _accessKeySecret() {
        const { data, errors } = this.props;
        const type = this.state.type || this.props.data.type

        let shownName = '';
        if (type === 'azureblob') {
            shownName = 'Key'
        } else {
            shownName = 'access_key_secret'
        }

        return (
            <div className="row form-group">
                <div className="col-4 text-right">
                    <b>{shownName}</b>
                </div>
                <div className="col-8">
                    <input
                        type="text"
                        className={classnames({
                            'form-control': true,
                            'is-invalid': errors.access_key_secret,
                        })}
                        name='access_key_secret'
                        defaultValue={data.access_key_secret}
                    />
                    <span className="invalid-feedback">
                        {errors.access_key_secret}
                    </span>
                </div>
            </div>
        );
    }
}

CloudConnectionDialogFields.defaultProps = {
    data: {},
}

CloudConnectionDialogFields.initialState = {
    type: '',
}

export default CloudConnectionDialogFields;