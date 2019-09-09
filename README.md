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
  - [ ] Implement balldontlie.io stats API
- [ ] Frontend
  - [ ] Create UI
  - [ ] Implement Choices for better searching
- [ ] Deployment
  - [ ] Deploy backend (Heroku?)
  - [ ] Deploy frontend (Netlify?)
