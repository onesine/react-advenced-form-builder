import React from 'react';

const inputsForm = [
    {
        type: 'text',
        name: 'email',
        label: "Votre Email",
        placeholder: "Veillez entrez votre email",
    },
    {
        type: 'paragraph',
        name: 'paragraph',
        label: "Votre paragraph",
        placeholder: "Veillez entrez votre paragraph",
    },
    {
        type: 'text',
        name: 'number',
        label: "Votre age",
        placeholder: "Veillez entrez votre age",
    },
    {
        type: 'date',
        name: 'date',
        label: "Votre Date de naissance",
        placeholder: "",
    },
    {
        type: 'file',
        name: 'file',
        label: "Votre photo de profile",
        placeholder: "",
    },
    {
        type: "select",
        name: "country",
        label: "Veillez choisir votre pays",
        values: [
            {
                label: "Bénin",
                value: "Bénin",
                selected: true
            },
            {
                label: "Burkina-Faso",
                value: "Burkina-Faso",
                selected: false
            },
            {
                label: "Burundi",
                value: "Burundi",
                selected: false
            },
            {
                label: "Cameroun",
                value: "Cameroun",
                selected: false
            },
            {
                label: "Cap-Vert",
                value: "Cap-Vert",
                selected: false
            },
            {
                label: "Centrafrique",
                value: "Centrafrique",
                selected: false
            },
            {
                label: "Comores",
                value: "Comores",
                selected: false
            },
            {
                label: "Congo",
                value: "Congo",
                selected: false
            }
        ]
    },
    {
        "type": "radio-group",
        "label": "Sexe",
        "name": "sexe",
        "values": [
            {
                "label": "Masculin",
                "value": "masculin"
            },
            {
                "label": "Feminin",
                "value": "feminin"
            },
        ]
    },
    {
        "type": "checkbox-group",
        "label": "Liste des Utilisateur",
        "name": "user",
        "values": [
            {
                label: "Onesine",
                value: "Onesine",
                selected: false

            },
            {
                label: "Estelle",
                value: "Estelle",
                selected: false
            },
            {
                label: "Nelson",
                value: "Nelson",
                selected: false
            },
            {
                label: "Festus",
                value: "Festus",
                selected: false
            },
        ]
    }
];

class App extends React.Component {

    state = {
        inputs: {},
        form: [],
    };

    componentDidMount() {
        const listInputs = inputsForm;
        const newInputs = {};
        const newForm = [];

        listInputs.forEach( input => {
            switch (input.type) {
                case "checkbox-group":
                    var listChecked = {};
                    input.values.forEach(selectedValue => {
                        listChecked[selectedValue.value] = selectedValue.selected;
                    });

                    newInputs[input.name] = listChecked;
                    break;
                case "select":
                    const filterValueSelect = input.values.filter(value => {
                        return value.selected;
                    });
                    newInputs[input.name] = filterValueSelect[0].value;
                    break;
                default:
                    newInputs[input.name] = '';
                    break;
            }
            newForm.push(input);
        });

        this.setState({inputs: newInputs});
        this.setState({form: newForm});
    }

    onChangeInput = (e) => {
        var {inputs, form} = this.state;
        const currentUpdateInput = {};

        switch (e.target.type) {
            case "checkbox":
                var listCheckbox = inputs[e.target.name];
                var modified = {};
                modified[e.target.value] = !listCheckbox[e.target.value];
                listCheckbox = {...inputs[e.target.name], ...modified };
                inputs[e.target.name] = listCheckbox;
                break;
            default:
                currentUpdateInput[e.target.name] = e.target.value;
                inputs = { ...inputs, ...currentUpdateInput };
                break;
        }

        const currentState = { form, inputs };
        this.setState(currentState);
    };

    onClickButton = (e) => {
        e.preventDefault();
        console.log(this.state.inputs);
    };

    render() {
        const {inputs, form} = this.state;
        // console.log("inputs", inputs);
        // console.log("form", form);

        const printInput = (input, index) => {
            switch (input.type) {
                case "textarea":
                    return (
                        <div key={index}>
                            <label>{ input.label }</label>
                            <textarea
                                name={input.name}
                                value={Object.values(inputs)[index]}
                                cols="30"
                                rows="10"
                                onChange={this.onChangeInput}
                                placeholder={input.placeholder}
                            />
                        </div>
                    );
                case "select":
                    return (
                        <div key={index}>
                            <label> { input.label }</label>
                            <select
                                name={input.name} id=""
                                value={Object.values(inputs)[index]}
                                onChange={this.onChangeInput}>
                                {
                                    input.values.map((option, indexOption) => (
                                        <option
                                            key={indexOption}
                                            value={option.value}
                                            defaultValue={option.selected}>
                                            { option.label }
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    );
                case "radio-group":
                    return (
                        <div key={index}>
                            <label>
                                {input.label}
                            </label>
                            <div>
                                { input.values.map((value, indexRadio) => (
                                    <div key={indexRadio}>
                                        <input
                                            name={input.name}
                                            value={value.value}
                                            checked={Object.values(inputs)[index] === value.value}
                                            type="radio"
                                            onChange={this.onChangeInput}
                                        />
                                        <label>{ value.label }</label>
                                    </div>
                                )) }
                            </div>
                        </div>
                    );
                case "checkbox-group":
                    return (
                        <div key={index}>
                            <label>
                                {input.label}
                            </label>
                            <div>
                                { input.values.map((value, indexCheckbox) => {
                                    const checked = Object.values(Object.values(inputs)[index])[indexCheckbox];
                                    return (
                                        <div key={indexCheckbox}>
                                            <input
                                                name={input.name}
                                                value={value.value}
                                                checked={checked}
                                                type="checkbox"
                                                onChange={this.onChangeInput}
                                            />
                                            <label>{ value.label }</label>
                                        </div>
                                    )
                                }) }
                            </div>
                        </div>
                    );
                default :
                    return (
                        <div key={index}>
                            <label>{ input.label }</label>
                            <input
                                type={input.type}
                                name={input.name}
                                value={Object.values(inputs)[index]}
                                placeholder={input.placeholder}
                                onChange={this.onChangeInput}
                            />
                        </div>
                    );
            }
        };

        return (
            <form>
                <h1>Titre de formulaire</h1>
                {
                    form.map(printInput)
                }
                <div>
                    <button type={"bubmit"} onClick={this.onClickButton}>Envoyer</button>
                </div>
            </form>
        );
    }
}

export default App;