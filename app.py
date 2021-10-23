from flask import (
    Flask,
    render_template,
    send_from_directory,
)
from os.path import split as p_split


app = Flask(__name__, template_folder=".")


def index():
    return render_template("index.html")


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def all_routes(path):
    if path == "":
        return index()
    

    return send_from_directory(*p_split(path))


def main():
    app.run(debug=True)


if __name__ == "__main__":
    main()
