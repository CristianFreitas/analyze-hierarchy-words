# Hierarchy Analyzer CLI

This is a simple command-line application to analyze a hierarchy of words and find matches at a given depth. This project uses TypeScript and can be easily run using Docker.

## Prerequisites

- Docker installed on your machine

## How to Run

1. **Clone the repository**:
    ```bash
    git clone https://github.com/CristianFreitas/analyze-hierarchy-analyzer.git
    cd hierarchy-analyzer
    ```

2. **Build the Docker image**:
    ```bash
    docker build -t hierarchy-analyzer .
    ```

3. **Run the application**:
    You can run the CLI with the following command:
    ```bash
    docker run --rm hierarchy-analyzer npx ts-node src/cli.ts analyze --depth 3 "Eu gosto de JavaScript e Python" --verbose
    ```

    Replace `"Eu gosto de JavaScript e Python"` with any phrase you'd like to analyze.

4. **Running with custom phrases**:
    To run the application with your own phrase, simply modify the phrase at the end of the command:
    ```bash
    docker run --rm hierarchy-analyzer npx ts-node src/cli.ts analyze --depth 2 "Eu gosto de Futebol e Natacao" --verbose
    ```

5. **Tests**:
    To run tests inside the Docker container:
    ```bash
    docker run --rm hierarchy-analyzer npx jest
    ```

## Notes

- The hierarchy structure is defined in the `dicts/hierarchy.json` file.
- You can modify the `depth` parameter to change the depth of the search within the hierarchy.

## Example Commands

- Analyze with a phrase repeated 10 times:
    ```bash
    docker run --rm hierarchy-analyzer npx ts-node src/cli.ts analyze --depth 3 "$(for i in {1..10}; do echo 'JavaScript e Python são linguagens populares.'; done)" --verbose
    ```

Enjoy analyzing your hierarchy!
