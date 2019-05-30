import React, { Component } from 'react';
import * as Shop from '../../shared/services/ShopDetails'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Label,Form } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback} from 'availity-reactstrap-validation';
class ShopModal extends Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = {
            modal:false,
            id:props.modalData[0].id,
            shopName: props.modalData[0].shopName,
            address: props.modalData[0].address,            
            pinCode: props.modalData[0].pinCode,
            contact: props.modalData[0].contact,
            landLineNo: props.modalData[0].landLineNo,
            email: props.modalData[0].email,
            GSTNo: props.modalData[0].GSTNo,
            PANNo: props.modalData[0].PANNo,
            description: props.modalData[0].description,
        }

    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.flag) {
            this.toggle();
        }
    } 

    shopNameHandler(e) {
        this.setState({ shopName: e.target.value });    
    }

    addressHandler(e) {
        this.setState({ address: e.target.value });
    }
    pinCodeHandler(e) {
        this.setState({ pinCode: e.target.value });    
    }
    contactHandler(e) {
        this.setState({ contact: e.target.value });    
    }
    landLineNoHandler(e) {
        this.setState({ landLineNo: e.target.value });    
    }
    emailHandler(e) {
        this.setState({ email: e.target.value });    
    }
    GSTNoHandler(e) {
        this.setState({ GSTNo: e.target.value });    
    }
    PANNoHandler(e) {
        this.setState({ PANNo: e.target.value });    
    }
    descriptionHandler(e) {
        this.setState({ description : e.target.value});
    }
    
    handleSave(e) {
        if(!this.state.shopName =='' && !this.state.address =='' && !this.state.pinCode=='' && !this.state.contact=='' && !this.state.landLineNo=='' && !this.state.email=='' && !this.state.GSTNo=='' && !this.state.PANNo=='') {
        const data= {
            "shopName":this.state.shopName,
            "address":this.state.address,
            "pinCode":this.state.pinCode,
            "contact":this.state.contact,
            "landLineNo":this.state.landLineNo,
            "email":this.state.email,
            "GSTNo":this.state.GSTNo,
            "PANNo":this.state.PANNo,
            "description":this.state.description,
           }
           
            Shop.putShopDetails(this.state.id,data)            
            .then()
            this.toggle();
        }
  }

  toggle() {
    this.setState({
        modal: !this.state.modal
    });
  }
    render() {
        console.log(this.state.id);
        
        return (
                <Modal isOpen={this.state.modal} toggle={this.toggle}  className={this.props.className}>
                  <ModalHeader toggle={this.toggle}> Edit Shop Details</ModalHeader> :
                     <ModalBody>
                        <Form onSubmit={this.props.isEdit ? this.handleSave.bind(this) : this.newhandleSave.bind(this) } >
                            <AvForm >
                                <AvGroup>
                                    <div className="form-group row">
                                        <Label className="col-sm-4 col-form-label">Name:</Label>
                                            <div className="col-sm-7">
                                                <AvInput name="shopName" id="shopName" value={this.state.shopName}
                                                  onChange={(e) => this.shopNameHandler(e)}  required />
                                                <AvFeedback>This field is mendetory</AvFeedback>
                                            </div>
                                    </div>
                                </AvGroup>
                                <AvGroup>
                                    <div className="form-group row">
                                        <Label className="col-sm-4 col-form-label">Address:</Label>
                                            <div className="col-sm-7">
                                                <AvInput type="textarea" name="address" id="address" value={this.state.address} 
                                                  onChange={(e) => this.addressHandler(e)}  required />
                                                <AvFeedback>This field is mendetory</AvFeedback>
                                            </div>
                                    </div>
                                </AvGroup>
                                <AvGroup>
                                    <div className="form-group row">
                                        <Label className="col-sm-4 col-form-label">Pin Code:</Label>
                                            <div className="col-sm-7">
                                                <AvInput type="number" name="pinCode" id="pinCode" value={this.state.pinCode} 
                                                   onChange={(e) => this.pinCodeHandler(e)}  required />
                                                <AvFeedback>This field is mendetory</AvFeedback>
                                            </div>
                                    </div>
                                </AvGroup>
                                <AvGroup>
                                    <div className="form-group row">
                                        <Label className="col-sm-4 col-form-label">Contact No:</Label>
                                            <div className="col-sm-7">
                                                <AvInput type="number" name="contact" id="contact" value={this.state.contact}
                                                 onChange={(e) => this.contactHandler(e)}  required />
                                                <AvFeedback>This field is mendetory</AvFeedback>
                                            </div>
                                    </div>
                                </AvGroup>
                                <AvGroup>
                                    <div className="form-group row">
                                        <Label className="col-sm-4 col-form-label">LandLine.No:</Label>
                                            <div className="col-sm-7">
                                                <AvInput type="number" name="landLineNo" id="landLineNo" value={this.state.landLineNo} 
                                                 onChange={(e) => this.landLineNoHandler(e)}  required />
                                                <AvFeedback>This field is mendetory</AvFeedback>
                                            </div>
                                    </div>
                                </AvGroup>
                                <AvGroup>
                                    <div className="form-group row">
                                        <Label className="col-sm-4 col-form-label">Email:</Label>
                                            <div className="col-sm-7">
                                                <AvInput type="email" name="email" id="email" value={this.state.email} 
                                                   onChange={(e) => this.emailHandler(e)}  required />
                                                <AvFeedback>This field is mendetory</AvFeedback>
                                            </div>
                                    </div>
                                </AvGroup>
                                <AvGroup>
                                    <div className="form-group row">
                                        <Label className="col-sm-4 col-form-label">GST No:</Label>
                                            <div className="col-sm-7">
                                                <AvInput  name="GSTNo" id="GSTNo"  value={this.state.GSTNo} 
                                                onChange={(e) => this.GSTNoHandler(e)} required ></AvInput>
                                                <AvFeedback>This field is mendetory</AvFeedback>
                                            </div>
                                    </div>
                                </AvGroup>
                                <AvGroup>
                                    <div className="form-group row">
                                        <Label className="col-sm-4 col-form-label">PAN No:</Label>
                                            <div className="col-sm-7">
                                                <AvInput  name="PANNo" id="PANNo"  value={this.state.PANNo} 
                                                onChange={(e) => this.PANNoHandler(e)} required ></AvInput>
                                                <AvFeedback>This field is mendetory</AvFeedback>
                                            </div>
                                    </div>
                                </AvGroup>
                                <AvGroup>
                                    <div className="form-group row">
                                        <Label className="col-sm-4 col-form-label">Description</Label>
                                            <div className="col-sm-7">
                                                <AvInput type="textarea" name="description" id="description"  value={this.state.description} 
                                                onChange={(e) => this.descriptionHandler(e)}  ></AvInput>
                                            </div>
                                    </div>
                                </AvGroup>
                                <ModalFooter>
                                    <Button color="primary" >Save Changes</Button> :
                                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                </ModalFooter>
                            </AvForm>
                        </Form>
                    </ModalBody>
                    </Modal>
        );
    }
}

export default ShopModal;