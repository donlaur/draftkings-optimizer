# Draftkings Optimizer

Uses [pydfs-lineup-optimizer Python library](https://github.com/DimaKudosh/pydfs-lineup-optimizer) to optimize NBA lineups in Draftkings.

## Python installation

1. Create Python environment

    ```python
        python3 -m venv env
    ```

2. Activate environment

    ```python
        source env/bin/activate
    ```

3. Install modules

    ```python
        flask
        flask-restful
        flask-cors
        jsonpickle
        pydfs-lineup-optimizer
        draft_kings
    ```

## TODO

- [ ] Backend (Python)
  - [x] Implement pydfs library
  - [x] Export pydfs lineup object as JSON
  - [x] Implement request from Draftkings API
  - [x] Create endpoint for optimized lineup
  - [x] Add status errors to API
  - [ ] Implement balldontlie.io stats API
- [ ] Frontend
  - [x] Create GatsbyJS instance
  - [ ] Add index page
    - [ ] Implement UI
      - [x] Add navbar
      - [x] Add form
        - [x] Add error states
        - [ ] Add loading state
      - [x] Add data table
      - [x] Add total salary and fppg
  - [ ] Add statistics page
  - [x] Implement Downshift for better searching
- [x] Deployment
  - [x] Deploy backend (Heroku?)
  - [x] Deploy frontend (Netlify?)
