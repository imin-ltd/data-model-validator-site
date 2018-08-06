import React, { Component } from 'react';
import Pluralize from 'react-pluralize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class ResultFilters extends Component {
  static fieldName(path) {
    const elements = path.split('.');
    return elements[elements.length - 1];
  }

  handleFilterChange(e, type, value) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (typeof (this.props.onFilterChange) === 'function') {
      this.props.onFilterChange(type, value);
    }
  }

  handleGroupChange(e) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (typeof (this.props.onGroupChange) === 'function') {
      this.props.onGroupChange(!this.props.group);
    }
  }

  render() {
    if (this.props.results && this.props.results.length) {
      const counts = {};
      const severityList = [];
      const categoryList = [];
      let { filter } = this.props;

      if (typeof filter === 'undefined') {
        filter = {};
      }

      if (typeof this.props.severities !== 'undefined') {
        if (typeof filter.severity === 'undefined') {
          filter.severity = {};
        }
        for (const severity in this.props.severities) {
          if (Object.prototype.hasOwnProperty.call(this.props.severities, severity)) {
            if (typeof filter.severity[severity] === 'undefined') {
              filter.severity[severity] = true;
            }
            counts[severity] = 0;
            for (const result of this.props.results) {
              if (result.severity === severity) {
                counts[severity] += 1;
              }
            }
            severityList.push(
              (
                <div key={`severity-${severity}-check`} className={`form-check dropdown-item ${filter.severity[severity] ? 'checked' : ''}`} onClick={e => this.handleFilterChange(e, 'severity', severity)}>
                  <input type="checkbox" className="form-check-input" id={`${severity}Check`} checked={filter.severity[severity]} />
                  <FontAwesomeIcon icon={filter.severity[severity] ? 'check-square' : 'square'} fixedWidth />
                  <label className="form-check-label form-check-label-severity" htmlFor={`${severity}Check`}>
                    <Pluralize singular={this.props.severities[severity].name} count={counts[severity]} />
                  </label>
                </div>
              ),
            );
          }
        }
      }

      if (typeof this.props.categories !== 'undefined') {
        if (typeof filter.category === 'undefined') {
          filter.category = {};
        }
        for (const category in this.props.categories) {
          if (Object.prototype.hasOwnProperty.call(this.props.categories, category)) {
            if (typeof filter.category[category] === 'undefined') {
              filter.category[category] = true;
            }
            counts[category] = 0;
            for (const result of this.props.results) {
              if (result.category === category) {
                counts[category] += 1;
              }
            }
            categoryList.push(
              (
                <div key={`category-${category}-check`} className={`form-check dropdown-item ${filter.category[category] ? 'checked' : ''}`} onClick={e => this.handleFilterChange(e, 'category', category)}>
                  <input type="checkbox" className="form-check-input" id={`${category}Check`} checked={filter.category[category]} />
                  <FontAwesomeIcon icon={filter.category[category] ? 'check-square' : 'square'} fixedWidth />
                  <label className="form-check-label form-check-label-category" htmlFor={`${category}Check`}>
                    {counts[category]} {this.props.categories[category].name}
                  </label>
                </div>
              ),
            );
          }
        }
      }

      if (severityList.length > 0 || categoryList.length > 0) {
        return (
          <div className="result-filters float-left">
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="filtersMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Filters
              </button>
              <form className="dropdown-menu p-2" aria-labelledby="filtersMenuButton">
                <h6 key="severity-header" className="dropdown-header">Severities</h6>
                {severityList}
                <h6 key="category-header" className="dropdown-header">Categories</h6>
                {categoryList}
                <div className="dropdown-divider"></div>
                <div className={`form-check dropdown-item ${this.props.group ? 'checked' : ''}`} onClick={e => this.handleGroupChange(e)}>
                  <input type="checkbox" className="form-check-input" id="groupCheck" checked={this.props.group} />
                  <FontAwesomeIcon icon={this.props.group ? 'check-square' : 'square'} fixedWidth />
                  <label className="form-check-label form-check-label-group" htmlFor="groupCheck">
                    Group messages
                  </label>
                </div>
              </form>
            </div>
          </div>
        );
      }
    }
    return '';
  }
}
