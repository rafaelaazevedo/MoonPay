FROM cypress/browsers:node18.6.0-chrome105-ff104

# adding user to Docker container and give permissions
RUN useradd -ms /bin/bash cypress

# installing cypress and giving premissions
RUN install -d -m 0755 -o cypress -g cypress /app
RUN chown cypress:cypress /app
WORKDIR /app

ENV CYPRESS_CACHE_FOLDER "/app/.cypress"

# fix Cypress issue when logging https://github.com/cypress-io/cypress/issues/1243
ENV CI=true

USER cypress

# install dependencies
COPY package.json package-lock.json ./
RUN npm install

# copy plugins configuration over to docker
COPY .eslintrc.json .prettierrc.yaml cypress.config.js ./
COPY reporter.config.json ./

# copy tests
COPY cypress cypress