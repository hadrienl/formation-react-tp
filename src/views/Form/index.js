import React from 'react';
import { create } from '../../services/api';

import './styles.scss';

export class Form extends React.Component {
  state = {
    title: '',
    content: '',
    errors: [],
  };

  setTitle = ({ target: { value: title } }) => this.setState({ title });
  setContent = ({ target: { value: content } }) => this.setState({ content });

  submit = async e => {
    e.preventDefault();

    const { title, content } = this.state;
    const errors = [];

    this.setState({ errors, submitting: true });

    if (!title) {
      errors.push('Le titre est requis');
    }

    if (!content) {
      errors.push('Le contenu est requis');
    }

    if (errors.length) {
      this.setState({ errors, submitting: false });
      return;
    }

    try {
      const { id } = await create({ title, content });
      this.setState({ submitting: false, id });
    } catch (e) {
      errors.push(e.message);
      this.setState({ errors, submitting: false });
    }
  }

  render () {
    const { title, content, errors, submitting } = this.state;
    const { submit, setTitle, setContent } = this;

    return (
      <form
        className="form"
        onSubmit={submit}>
        <div className="form__control">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={setTitle} />
        </div>
        <div className="form__control">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={setContent} />
        </div>
        <div className="form__control form__control--buttons">
          <div className="buttons__errors">
            {!!errors.length &&
              <ul>{errors.map(error => (
                <li key={error}>{error}</li>
              ))}</ul>
            }
          </div>
          <div className="buttons__buttons">
            <button
              disabled={submitting}
              type="submit">
              Ajouter
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default Form;
