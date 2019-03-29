export class Container {
  private static _instance: Container = new Container();
  private _dependencies: { [key: string]: Object } = {};

  constructor() {
    if (Container._instance) {
      throw new Error("Cannot call new on a container.");
    }
    Container._instance = this;
  }

  public static get instance(): Container {
    return Container._instance;
  }

  register(name: string, dependencies: string[], implementation: any) {
    if (this._dependencies[name]) {
      throw new Error("Dependency has already been registered.");
    }
    let dependenciesImplementation = this.getDependenciesImplementation(
      dependencies
    );
    this._dependencies[name] = new implementation(
      ...dependenciesImplementation
    );
  }

  resolve(name: string): object {
    if (!this._dependencies[name]) {
      throw new Error("Dependency does not exist");
    }
    return this._dependencies[name];
  }

  private getDependenciesImplementation(names: string[]): object[] {
    return names.map(name => this.resolve(name));
  }
}
