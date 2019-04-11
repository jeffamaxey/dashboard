import * as React from 'react'
import { connect } from 'react-redux'
import { Card, CardBody, Button } from 'reactstrap'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup';

import { FormikInput } from '@common/Field'


const ModelSchema = Yup.object().shape({
  description: Yup.string()
    .required('Required')
});

class ModelDescriptionFormImpl extends React.Component<ModelDescriptionFormProps, ModelDescriptionFormState> {
  render() {
    return (
      <React.Fragment>
        <Card className='mb-3'>
          <Formik
            initialValues={{
              description: this.props.initialValues.description,
            }}
            validationSchema={ModelSchema}
            onSubmit={this.props.onSubmit}>
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <CardBody>
                  <Field
                    name="description"
                    label="Description"
                    component={FormikInput}
                    className="form-control"
                    type="textarea"
                    placeholder="e.g. sklearn linearSVC C=0.01"
                    required />
                </CardBody>
                {this.renderButtons(isSubmitting)}
              </Form>
            )}
          </Formik>
        </Card>
      </React.Fragment>
    )
  }

  /**
   * Render control buttons
   *
   * Put on footer of this modal
   */
  renderButtons(isSubmitting): JSX.Element {
    if (isSubmitting) {
      return (
        <CardBody>
          <div className='loader loader-primary loader-xs mr-2' />
          Submitting...
        </CardBody>
      )
    }

    return (
      <CardBody className='text-right'>
        <Button color='success' type='submit'>
          <i className='fas fa-check fa-fw mr-2'></i>
          Update Model Description
        </Button>
        {' '}
        <Button outline color='info' onClick={this.props.onCancel}>
          <i className='fas fa-ban fa-fw mr-2'></i>
          Reset
        </Button>
      </CardBody>
    )
  }
}

const defaultInitialValues = {
  description: ''
}

interface CustomProps {
  onCancel
  onSubmit
  initialValues: {
    description: string
  }
}

interface StateProps {
  initialValues
}

interface DispatchProps {}

type ModelDescriptionFormProps = CustomProps & StateProps & DispatchProps

interface ModelDescriptionFormState {}

export const ModelDescriptionForm = connect(
  (state: any, extraProps: CustomProps) => ({
    ...state.form,
    ...extraProps,
    initialValues: {
      ...defaultInitialValues,
      ...extraProps.initialValues
    },
  })
)(ModelDescriptionFormImpl)
