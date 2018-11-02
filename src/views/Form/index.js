import React from 'react';
import { withRouter } from 'react-router-dom';

import { create, get, update } from '../../services/api';
import Loading from '../../components/Loading';

import './styles.scss';

const initialItem = {
  id: '',
  title: '',
  content: '',
  errors: [],
};

export class Form extends React.Component {
  state = {
    ...initialItem,
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    
    if (id) {
      this.loadItem(id);
    }
  }

  componentDidUpdate({ match: { params: { id: prevIdFromRoute } } }) {
    const { match: { params: { id: idFromRoute } } } = this.props;
    const { id } = this.state;

    if (prevIdFromRoute !== idFromRoute &&
        (!id || id !== +idFromRoute)) {
      this.loadItem(idFromRoute);
    }
  }

  async loadItem (id) {
    try {
      if (!id) throw new Error('no id');

      this.setState({ loading: true });

      const data = await get(+id);

      this.setState({ ...data, loading: false });
    } catch (e) {
      this.setState({ ...initialItem });
    }
  }

  setTitle = ({ target: { value: title } }) => this.setState({ title });
  setContent = ({ target: { value: content } }) => this.setState({ content });

  submit = async e => {
    e.preventDefault();

    const { history: { push } } = this.props;
    const { id, title, content } = this.state;
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
      const { id: newId } = id
        ? await update(id, { title, content })
        : await create({ title, content });
      
      this.setState({ submitting: false, id: newId });
      push(`/edit/${newId}`);
    } catch (e) {
      errors.push(e.message);
      this.setState({ errors, submitting: false });
    }
  }

  render () {
    const { loading, id, title, content, errors, submitting } = this.state;
    const { submit, setTitle, setContent } = this;

    return loading
      ? <Loading />
      : (
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
                {id ? 'Modifier' : 'Ajouter'}
              </button>
            </div>
          </div>
        </form>
      )
  }
}

export default withRouter(Form);
