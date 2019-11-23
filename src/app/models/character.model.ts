export class Character {
    constructor(
      public id: number,
      public raceid: String,
      public equipmentid: number,
      public classid: number,
      public playerid: number,
      public name: string,
      public alignment: string,
      public strength: number,
      public dexterity: number,
      public constitution: number,
      public intelligence: number,
      public wisdom: number,
      public charisma: number
    ) {}
}
