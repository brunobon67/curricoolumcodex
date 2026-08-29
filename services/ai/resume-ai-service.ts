import type { ResumeContent } from "@/types/resume";
export interface ResumeAIService {
  generateProfile(input: Pick<ResumeContent,"experience"|"skills">): Promise<string>;
  improveExperience(description:string,jobDescription?:string):Promise<string[]>;
  suggestSkills(content:ResumeContent):Promise<string[]>;
  translate(content:ResumeContent,locale:string):Promise<ResumeContent>;
  analyzeATS(content:ResumeContent,jobDescription:string):Promise<{score:number;suggestions:string[]}>;
}
export class UnconfiguredAIService implements ResumeAIService {
  private unavailable():never{throw new Error("AI provider non configurato")}
  async generateProfile(){return this.unavailable()} async improveExperience(){return this.unavailable()} async suggestSkills(){return this.unavailable()} async translate(){return this.unavailable()} async analyzeATS(){return this.unavailable()}
}
