import { Dependency, DependencyType } from "./types";

export class DependencyManager {
  private dependencies: Dependency[] = [];

  addDependency(dependency: Dependency) {
    this.dependencies.push(dependency);
  }

  evaluateDependencies(values: Record<string, any>) {
    const result: Record<string, any> = {};

    for (const dep of this.dependencies) {
      const sourceValue = values[dep.sourceField];
      const targetValue = values[dep.targetField];

      if (dep.condition(sourceValue, targetValue)) {
        switch (dep.type) {
          case DependencyType.DISABLES:
            result[dep.targetField] = { disabled: true };
            break;
          case DependencyType.REQUIRES:
            result[dep.targetField] = { required: true };
            break;
          case DependencyType.HIDES:
            result[dep.targetField] = { hidden: true };
            break;
          case DependencyType.SETS_OPTIONS:
            if (dep.options) {
              result[dep.targetField] = { options: dep.options };
            }
            break;
        }
      }
    }

    return result;
  }
}
