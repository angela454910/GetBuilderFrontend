import React from "react";
import PropTypes from "prop-types";
import Alert from "@material-ui/lab/Alert";
import { withRouter } from "react-router";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { updateBuilder } from "../../../../../api/builder";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
} from "@material-ui/core";

const useStyles = () => ({
  root: {},
});

class AccountDetails extends React.Component {
  state = {
    builderName: "",
    ABNNumber: "",
    email: "",
    telephoneNumber: "",
    address: "",
    postcode: "",
    description: "",
    error: null,
    isUpdating: false,
  };

  componentDidMount() {
    this.setState({
      builderName: this.props.state.builderName || "",
      ABNNumber: this.props.state.ABNNumber || "",
      email: this.props.state.email || "",
      telephoneNumber: this.props.state.telephoneNumber || "",
      address: this.props.state.address || "",
      postcode: this.props.state.postcode || "",
      description: this.props.state.description || "",
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = () => {
    const builderId = this.props.match.params.builderId;
    const builder = {
      builderName: this.state.builderName,
      abn: this.state.ABNNumber,
      email: this.state.email,
      mobile: this.state.telephoneNumber,
      address: this.state.address,
      postcode: this.state.postcode,
      description: this.state.description,
    };
    this.setState({ error: null, isUpdating: true }, () => {
      updateBuilder(builderId, builder)
        .then(() => {
          this.setState(
            {
              isUpdating: false,
            },
            () => {
              window.location.reload();
            }
          );
        })
        .catch((error) => this.setState({ error, isUpdating: false }));
    });
  };

  render() {
    //const { className, ...rest } = this.props;  {...rest} className={clsx(classes.root, className)}
    const { classes } = this.props;
    return (
      <Card>
        <ValidatorForm instantValidate={false} onSubmit={this.handleSubmit}>
          <CardHeader
            subheader="The information can be edited"
            title="Profile"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextValidator
                  variant="outlined"
                  fullWidth
                  label="Builder Name"
                  name="builderName"
                  value={this.state.builderName}
                  onChange={this.handleChange}
                  validators={["required", "minStringLength:2"]}
                  errorMessages={[
                    "this field is required",
                    "The length must longer than 2",
                  ]}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextValidator
                  variant="outlined"
                  fullWidth
                  label="ABN Number"
                  name="ABNNumber"
                  value={this.state.ABNNumber}
                  onChange={this.handleChange}
                  validators={["required", "matchRegexp:^[0-9]{11}$"]}
                  errorMessages={["this field is required", "ABN is not valid"]}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextValidator
                  color="primary"
                  variant="outlined"
                  fullWidth
                  label="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    "this field is required",
                    "email is not valid",
                  ]}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextValidator
                  variant="outlined"
                  fullWidth
                  label="Telephone Number"
                  name="telephoneNumber"
                  value={this.state.telephoneNumber}
                  onChange={this.handleChange}
                  validators={["required", "matchRegexp:^[0-9]{10}$"]}
                  errorMessages={[
                    "this field is required",
                    "phone number is not valid",
                  ]}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextValidator
                  variant="outlined"
                  fullWidth
                  label="Address"
                  name="address"
                  value={this.state.address}
                  onChange={this.handleChange}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextValidator
                  color="primary"
                  variant="outlined"
                  fullWidth
                  label="Postcode"
                  name="postcode"
                  value={this.state.postcode}
                  onChange={this.handleChange}
                  validators={["required", "matchRegexp:^[0-9]{4}$"]}
                  errorMessages={[
                    "this field is required",
                    "postcode is not valid",
                  ]}
                />
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  color="primary"
                  variant="outlined"
                  fullWidth
                  label="Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>
            {this.state.error && (
              <Alert severity="error">Update Profile Failed !</Alert>
            )}
          </CardContent>
          <Divider />
          <CardActions>
            <Button type="submit" color="primary" variant="contained">
              Update Profile
            </Button>
          </CardActions>
        </ValidatorForm>
      </Card>
    );
  }
}

AccountDetails.propTypes = {
  className: PropTypes.string,
};

export default withRouter(AccountDetails);